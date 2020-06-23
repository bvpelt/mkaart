import WMTS from 'ol/source/WMTS';
import { BrtLayer } from './brtLayer';
import { KadastraleKaartLayer } from './kadastraleKaartLayer';
import { BgtStandaardLayer } from './bgtStandaardLayer';

export class WMTSLayer {
    static layers: Array<WMTS>;

    constructor() {
        if (WMTSLayer.layers === null) {
            WMTSLayer.layers = new Array(3);

            WMTSLayer.layers[0] = BrtLayer.createBrtLayer();
            WMTSLayer.layers[1] = KadastraleKaartLayer.createKadastraleKaartLayer();
            WMTSLayer.layers[2] = BgtStandaardLayer.createBgtStandaardLayer();
        }
    }

    getWMTSLayers(): Array<WMTS> {
        return WMTSLayer.layers;
    }
}