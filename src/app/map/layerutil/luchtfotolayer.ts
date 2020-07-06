import WMTS from "ol/source/WMTS";
import { getTopLeft } from "ol/extent";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { LayerUtil } from "./layerutil";
import { Config } from "../../config/config";

export class LuchtFotoLayer {
  public static createLuchtFotoLayer(): WMTS {
    const config: Config = Config.instance;
    const layerUtil: LayerUtil = LayerUtil.instance;
    const layerName: string = "Actueel_ortho25";

    const luchtFotoLayer: WMTS = new WMTS({
      crossOrigin: "anonymous",
      format: config.pdokwmtsimageformat,
      layer: layerName,
      matrixSet: config.projectionName, // EPSG:28992
      projection: config.projectionName,
      style: "default",
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(config.projectionExtent),
        resolutions: layerUtil.resolutions,
        matrixIds: layerUtil.matrixIds,
      }),
      url: config.pdokwmtsluchtfoto,
      wrapX: true,
    });

    return luchtFotoLayer;
  }
}
