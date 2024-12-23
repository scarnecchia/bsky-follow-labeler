import { CommitCreateEvent, Jetstream } from '@skyware/jetstream';
import fs from 'node:fs';
import * as readline from 'readline';

import {
  CURSOR_UPDATE_INTERVAL,
  DID,
  FIREHOSE_URL,
  HOST,
  METRICS_PORT,
  PORT,
  TARGET,
  WANTED_COLLECTION,
} from './config.js';
import { labelerServer } from './label.js';
import logger from './logger.js';
import { startMetricsServer } from './metrics.js';

// Function to process each line
function processLine(line: string) {
  console.log(`Processing line: ${line}`);

  const did = line.trim();

  try {
    labelerServer.createLabel({ uri: did, val: '<label-value-here>' });
    logger.info(`Successfully labeled ${did}`);
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
const filePath = '<path-to-your-file>';
readFileLineByLine(filePath).catch((err) => console.error(err));
