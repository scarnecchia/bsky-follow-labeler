import { readFile, writeFile, writeFileSync } from 'node:fs';

import { Labeled } from './types.js';

export const labeledAccount = (did: string, subject: string, rkey: string, isDelete: boolean) => {
  console.log(`${did} has been labeled for following ${subject} with rkey ${rkey}`);

  try {
    if (isDelete) {
      deleteLabeledAccount(did);
    } else {
      addLabeledAccount(did, subject, rkey);
    }
  } catch (e) {
    console.log('Error:', e);
  }
};

function addLabeledAccount(did: string, subject: string, rkey: string) {
  const labeled: Labeled[] = [
    {
      did,
      subject,
      rkey,
    },
  ];

  try {
    writeFileSync('labeled.json', JSON.stringify(labeled, null, 2));
    console.log('Successfully wrote file');
  } catch (err) {
    console.log('Error writing file:', err);
  }
}

function deleteLabeledAccount(did: string) {
  readFile('labeled.json', 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file:', err);
      return;
    }

    let labeledArray: Labeled[] = JSON.parse(data) as Labeled[];
    labeledArray = labeledArray.filter((item) => item.did !== did);

    writeFile('labeled.json', JSON.stringify(labeledArray, null, 2), (err) => {
      if (err) {
        console.log('Error writing file:', err);
      } else {
        console.log('Successfully updated file');
      }
    });
  });
}
