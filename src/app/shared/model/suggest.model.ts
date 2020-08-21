import { SuggestSpellCheck } from './suggestspellcheck.model';
import { SuggestResponse } from './suggestresponse.model';

export class Suggest {
  public response: SuggestResponse;
  public highlighting: any;
  public spellcheck: SuggestSpellCheck;
}
