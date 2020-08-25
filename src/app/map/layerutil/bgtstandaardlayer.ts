import WMTS from 'ol/source/WMTS';
import { getTopLeft } from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { LayerUtil } from './layerutil';
import { Config } from '../../config/config';

export class BgtStandaardLayer {
  public static createBgtStandaardLayer(): WMTS {
    const config: Config = Config.instance;
    const layerUtil: LayerUtil = LayerUtil.instance;
    const layerName = 'bgtstandaard';

    const bgtStandaardLayer: WMTS = new WMTS({
      crossOrigin: 'anonymous',
      format: config.pdokwmtsimageformat,
      layer: layerName,
      matrixSet: config.projectionName,
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

    console.log('BgtStandaardLayer - layer: ' + bgtStandaardLayer.toString());

    return bgtStandaardLayer;
  }
}
