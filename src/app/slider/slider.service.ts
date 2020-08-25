import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SliderResult } from '../shared/model/sliderresult';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  sliderChange: Subject<SliderResult>;

  constructor() {
    this.sliderChange = new Subject<SliderResult>();
  }
}
