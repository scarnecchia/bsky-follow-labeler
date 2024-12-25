import { LabelValueDefinitionStrings } from '@atproto/api/dist/client/types/com/atproto/label/defs.js';

export interface Label {
  rkey: string;
  identifier: string;
  negate?: boolean;
  locales: LabelValueDefinitionStrings[];
}

export interface Labeled {
  did: string;
  subject: string;
  rkey: string;
}
