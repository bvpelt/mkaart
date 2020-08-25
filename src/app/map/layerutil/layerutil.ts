import Extent from 'ol/interaction/Extent';
import Point from 'ol/geom/Point';
import Projection from 'ol/proj/Projection';
import { Config } from 'src/app/config/config';

export class LayerUtil {
  private static _instance: LayerUtil = null;
  private config: Config = Config.instance;

  resolutions: number[] = [
    3440.64,
    1720.32,
    860.16,
    430.08,
    215.04,
    107.52,
    53.76,
    26.88,
    13.44,
    6.72,
    3.36,
    1.68,
    0.84,
    0.42,
    0.21,
  ];

  matrixIds: string[] = new Array<string>(this.resolutions.length);
  rdProjection: Projection = new Projection({
    code: this.config.projectionName,
    units: this.config.units,
    extent: this.config.projectionExtent,

    getPointResolution(resolution) {
      return resolution;
    },
  });

  private constructor() {
    for (let z = 0; z < this.resolutions.length; ++z) {
      this.matrixIds[z] = this.config.projectionName + ':' + z;
      // console.log('LayerUtil - Generating matrixids[' + z + ']: ' + this._matrixIds[z]);
    }
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }
}
