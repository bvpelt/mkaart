import { Component, OnInit } from "@angular/core";
import { SliderResult } from "./shared/model/sliderresult";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "mkaart";

  ngOnInit(): void {}

  getElement(div) {
    return document.querySelector(div);
  }

  updateSize($event: SliderResult): void {
    let cssclas = ".left";
    const left = this.getElement(cssclas);

    cssclas = ".right";
    const right = this.getElement(cssclas);

    console.log(
      "location updateSize - x: " +
        $event.x +
        " size: " +
        $event.screenSize +
        " screensize: " +
        $event.screenSize
    );

    let newLeftWidth: number = $event.x;
    let newRightWidth: number = $event.screenSize - $event.x;
    console.log(
      "left width: " +
        newLeftWidth +
        " right width: " +
        newRightWidth +
        " total: " +
        (newLeftWidth + newRightWidth)
    );
    left.style.width = newLeftWidth + "px";
    right.style.width = newRightWidth + "px";
  }
}
