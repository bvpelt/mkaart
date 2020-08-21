import { Component, AfterViewInit } from '@angular/core';
import { Map, View } from 'ol';
import sync from 'ol-hashed';
import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import { createStringXY, toStringXY } from 'ol/coordinate';
import { defaults as defaultControls, FullScreen } from 'ol/control';
import MousePosition from 'ol/control/MousePosition';
import {
  defaults as defaultInteractions,
  DragPan,
  DragRotateAndZoom,
  MouseWheelZoom,
  DragZoom,
  Interaction,
} from 'ol/interaction';
import { LayerUtil } from './layerutil/layerutil';
import { BrtAchtergrondLayer } from './layerutil/brtachtergrondlayer';
import { BgtAchtergrondLayer } from './layerutil/bgtachtergrondlayer';
import { BgtStandaardLayer } from './layerutil/bgtstandaardlayer';
import { LuchtFotoLayer } from './layerutil/luchtfotolayer';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { LocationExchange } from '../shared/services/locationexchange';
import { Config } from '../config/config';
import { SliderResult } from '../shared/model/sliderresult';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  public map: Map;
  private layerUtil: LayerUtil = LayerUtil.instance;
  private config: Config = Config.instance;
  private location: Point = this.config.center;
  private iconLayer: VectorLayer = null;

  constructor(
    private locationExchange: LocationExchange,
    private mapService: MapService
  ) {
    this.mapService.mapChange.subscribe((event: SliderResult) => {
      setTimeout(() => {
        this.mapService.map.updateSize();
      }, 100);
    });
  }

  ngAfterViewInit() {
    const mousePositionControl: MousePosition = this.createMouseTracker();

    this.map = new Map({
      target: 'map',
      interactions: defaultInteractions({
        altShiftDragRotate: true,
        onFocusOnly: false,
        doubleClickZoom: true,
        keyboard: true,
        mouseWheelZoom: true,
        shiftDragZoom: true,
        dragPan: true,
        pinchRotate: true,
        pinchZoom: true,
        zoomDelta: 1,
        zoomDuration: 10,
      }).extend([
        new DragRotateAndZoom(),
        new DragPan(),
        new MouseWheelZoom(),
        new DragZoom(),
      ]),
      layers: [
        new TileLayer({
          opacity: 1.0,
          source: BrtAchtergrondLayer.createBrtAchtergrondLayer(),
          zIndex: 0,
          visible: true,
          maxResolution: 3400,
          minResolution: 1.68,
        }),
        new TileLayer({
          opacity: 1.0,
          source: BgtAchtergrondLayer.createBgtAchtergrondLayer(),
          zIndex: 1,
          visible: true,
          maxResolution: 1.67,
          minResolution: 0.22,
        }),
        new TileLayer({
          opacity: 1.0,
          source: BgtStandaardLayer.createBgtStandaardLayer(),
          zIndex: 2,
          visible: false,
          maxResolution: 0.21,
          minResolution: 0.05,
        }),
        new TileLayer({
          opacity: 1.0,
          source: LuchtFotoLayer.createLuchtFotoLayer(),
          zIndex: 2,
          visible: true,
          maxResolution: 0.21,
          minResolution: 0.05,
        }),
      ],
      view: new View({
        projection: this.layerUtil.rdProjection,
        center: this.config.center.getCoordinates(),
        zoom: 11,
        minResolution: 0.05,
        maxResolution: 2000,
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: this.config.nlxtent.getExtentInternal(),
        }),
        new FullScreen(),
        mousePositionControl,
      ]),
    });

    this.mapService.setMap(this.map);

    this.map.getView().setMaxZoom(14);
    this.map.getView().setMinZoom(2);

    this.locationExchange.currentLocation.subscribe((point) => {
      this.moveTo(point);
    });

    // sync(this.map);
  }

  private moveTo(
    point: Point,
    duration: number = 2000,
    zoomLevel: number = 11
  ) {
    const view: View = this.map.getView();
    view.animate(
      { zoom: zoomLevel },
      {
        center: point.getCoordinates(),
        duration: duration,
      }
    );

    this.setIcon(point);
  }

  private createMouseTracker(): MousePosition {
    const mousePosition: MousePosition = new MousePosition({
      coordinateFormat: createStringXY(3), // 3 digits
      projection: this.config.projectionName, // 'EPSG:28992',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;',
    });
    return mousePosition;
  }

  private removeIcon() {
    if (this.iconLayer) {
      this.map.removeLayer(this.iconLayer);
    }
  }

  private setIcon(point: Point) {
    this.removeIcon();

    const iconFeature = new Feature({
      geometry: point,
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1.0],
        scale: 1.0,
        src: 'assets/icon.png',
      }),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    this.iconLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 99999,
    });

    this.map.addLayer(this.iconLayer);
  }

  updateSize($event: SliderResult): void {
    console.log(
      'map updateSize - x: ' +
        $event.x +
        ' size: ' +
        $event.screenSize +
        ' new width: ' +
        (100 * ($event.screenSize - $event.x)) / $event.screenSize
    );
  }
}
