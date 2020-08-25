import WMTS from 'ol/source/WMTS';
import { getTopLeft } from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { LayerUtil } from './layerutil';
import { Config } from '../../config/config';

export class BgtAchtergrondLayer {
  public static createBgtAchtergrondLayer(): WMTS {
    const config: Config = Config.instance;
    const layerUtil: LayerUtil = LayerUtil.instance;
    const layerName = 'bgtachtergrond';

    const bgtAchtergrondLayer: WMTS = new WMTS({
      crossOrigin: 'anonymous',
      format: config.pdokwmtsimageformat,
      layer: layerName,
      matrixSet: config.projectionName, // EPSG:28992
      projection: config.projectionName,
      style: 'default',
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(config.projectionExtent),
        resolutions: layerUtil.resolutions,
        matrixIds: layerUtil.matrixIds,
      }),
      url: config.pdokwmtsurl,
      wrapX: true,
    });

    return bgtAchtergrondLayer;
  }
}
