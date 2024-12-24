import fs from 'node:fs';
import * as readline from 'readline';

import { labelerServer } from './label.js';
import logger from './logger.js';

// Function to process each line
function processLine(line: string) {
  console.log(`Processing line: ${line}`);

  const did = line.trim();

  try {
    labelerServer.createLabels({ uri: did }, { negate: ['<insert-label>'] });
    logger.info(`Successfully delete label from ${did}`);
  } catch (error) {
    logger.error(`Error adding new label: ${error}`);
  } // Add your custom logic here
}

// Function to read file line by line
async function readFileLineByLine(filePath: string) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    processLine(line);
  }
}

// Call the function with the path to your file
const filePath = 'dids.txt';
readFileLineByLine(filePath).catch((err) => console.error(err));
