import { Label } from './types.js';
import { TARGET } from './config.js';

export const LABEL_LIMIT = 1;
export const LABELS: Label[] = [
  {
    target: TARGET,
    identifier: 'jesse-singal-follower',
    locales: [
      { lang: 'en', name: 'Jesse Singal', description: 'This user follows Jesse Singal.'},
    ]
  },
];
