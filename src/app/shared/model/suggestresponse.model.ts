import { LookupWoonplaats } from './lookupwoonplaats.model';
import { LookupWeg } from './lookupweg.model';
import { LookupPostCode } from './lookuppostcode.model';
import { LookupAdres } from './lookupadres.model';
import { SuggestDoc } from './suggestdoc.model';
import { LookupGemeente } from './lookupgemeente.model';

export class SuggestResponse {
  public numFound: number;
  public start: number;
  public maxScore: number;
  public docs: (
    | SuggestDoc
    | LookupGemeente
    | LookupWoonplaats
    | LookupWeg
    | LookupPostCode
    | LookupAdres
  )[];
}
