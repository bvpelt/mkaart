import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  combineLatest,
  fromEvent,
  MonoTypeOperatorFunction,
  Observable,
  Subject,
} from "rxjs";
import {
  debounceTime,
  distinctUntilKeyChanged,
  map,
  pluck,
  repeat,
  startWith,
  switchMapTo,
  takeUntil,
  tap,
} from "rxjs/operators";
import { SliderResult } from "../shared/model/sliderresult";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.css"],
})
export class SliderComponent implements OnInit, OnDestroy {
  @Output() public sliderResult = new EventEmitter<SliderResult>();
  public showIndicator = false;

  private onDestroy$ = new Subject<void>();
  private mouseDownSubject$ = new Subject<void>();

  private onWindowResize$ = fromEvent(window, "resize").pipe(
    debounceTime(50),
    startWith(null)
  );

  constructor() {}

  public ngOnInit(): void {
    combineLatest([this.handleMouseDragging$(), this.onWindowResize$])
      .pipe(
        map(([mousePosition, _windowSize]) => ({
          x: mousePosition,
          screenSize: Math.floor(document.documentElement.clientWidth),
        })),
        distinctUntilKeyChanged("x"),
        map((sliderResult) => this.limitPanelSize(sliderResult)),
        takeUntil(this.onDestroy$)
      )
      .subscribe((result) => {
        console.log("Slider emit sliderresult: " + JSON.stringify(result));
        this.sliderResult.emit(result);
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private handleMouseDragging$ = () =>
    this.mouseDownSubject$.pipe(
      switchMapTo(this.onMouseMove$()),
      this.startStopMouseDragging$(),
      pluck("clientX")
    );

  private onMouseMove$ = () =>
    fromEvent<MouseEvent>(document, "mousemove").pipe(
      tap((evt) => evt.preventDefault())
    );

  private onMouseUp$ = () =>
    fromEvent<MouseEvent>(document, "mouseup").pipe(
      tap((evt) => {
        evt.preventDefault();
        console.log("Slider: Mouseup");
      })
    );

  public onMouseDown(evt: MouseEvent): void {
    evt.preventDefault();
    console.log("Slider: MouseDown");
    this.mouseDownSubject$.next(null);
  }

  /**
   * this custom RxJS operator has a sideeffect which shows the dragging indicator
   * @NOTE revive observable with takeuntil repeat trick, see https://medium.com/angular-in-depth/rxjs-repeat-operator-beginner-necromancer-guide-391a3b2ad3ad
   */
  private startStopMouseDragging$<T>(): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) =>
      source.pipe(
        tap(() => {
          this.showIndicator = true;
        }),
        // tslint:disable-next-line:rxjs-no-unsafe-takeuntil
        takeUntil(
          this.onMouseUp$().pipe(
            tap(() => {
              this.showIndicator = false;
            })
          )
        ),
        repeat()
      );
  }

  /**
   * Limiteer breedte paneel tussen minmaal 8% en maximaal 92% van het scherm
   */
  private limitPanelSize = (sliderResult: SliderResult): SliderResult => {
    const minX = (sliderResult.screenSize / 12) * 1;
    const maxX = (sliderResult.screenSize / 12) * 11;
    const x =
      sliderResult.x < minX
        ? minX
        : sliderResult.x > maxX
        ? maxX
        : sliderResult.x;
    return {
      x,
      screenSize: sliderResult.screenSize,
    };
  };
}
