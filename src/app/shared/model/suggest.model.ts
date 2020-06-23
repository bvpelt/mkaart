import { SuggestResponse } from './suggestResponse.model';
import { SuggestSpellCheck } from './suggestSpellCheck.model';

export class Suggest {
    public response: SuggestResponse;
    public highlighting: any;
    public spellcheck: SuggestSpellCheck;
}