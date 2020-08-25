import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SliderResult } from '../shared/model/sliderresult';
import { Map } from 'ol';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  mapChange: Subject<SliderResult>;
  map: Map;

  constructor() {
    this.mapChange = new Subject<SliderResult>();
  }

  setMap(map: Map): void {
    this.map = map;
  }
}
