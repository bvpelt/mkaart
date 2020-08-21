import Extent from 'ol/interaction/Extent';
import Point from 'ol/geom/Point';
import Coordinate from 'ol/coordinate';

export class Config {
  private static _instance: Config;

  pdokwmtsurl = 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts?';
  pdokwmtsluchtfoto =
    'https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts?';
  pdokwmtsimageformat = 'image/png';
  projectionName = 'EPSG:28992';
  units = 'm';
  projectionExtent: any = [
    -285401.92,
    22598.08,
    595401.9199999999,
    903401.9199999999,
  ];
  nlxtent: Extent = new Extent({
    extent: [9632, 306708, 278200, 622130],
  });
  center: Point = new Point([156527, 456220]);

  private constructor() {}

  public static get instance() {
    return this._instance || (this._instance = new this());
  }
  /*
  public getCenterExtend(): Coordinate {
    var c: Coordinate = this.nlxtent.getCenter();
    return c;
  }
  */
}
