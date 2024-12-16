import { LabelValueDefinitionStrings } from '@atproto/api/dist/client/types/com/atproto/label/defs.js';

export interface Label {
  target: string;
  identifier: string;
  locales: LabelValueDefinitionStrings[];
}
