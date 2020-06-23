
import { SuggestDoc } from './suggestDoc.model'
import { LookupGemeente } from './lookupGemeente.model';
import { LookupWoonplaats } from './lookupWoonplaats.model';
import { LookupWeg } from './lookupWeg.model';
import { LookupPostCode } from './lookupPostCode.model';
import { LookupAdres } from './lookupAdres.model';

export class SuggestResponse {
    public numFound: number;
    public start: number;
    public maxScore: number;
    public docs: (SuggestDoc | LookupGemeente | LookupWoonplaats | LookupWeg | LookupPostCode | LookupAdres)[];
}