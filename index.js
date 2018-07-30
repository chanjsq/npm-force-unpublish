#!/usr/bin/env node

const chalk = require('chalk');
const shell = require('shelljs');
const { sleep } = require('sleep');

const log = console.log;

const error = chalk.bgRed.bold;
const success = chalk.green;

const args = process.argv;

if (args.length < 4) {
    log(error('Usage: npx force-unpublish package-name \'the reason\''));
    return;
}

const package = args[2];
const message = args[3];

log(`🔥 Unpublishing ${package}...`);

shell.exec(`npm deprecate ${package} '${message}'`);
shell.exec(`npm owner add npm ${package}`);

sleep(2);
shell.exec(`npm owner rm $(npm whoami) ${package}`);

log(success('🎉 Done.'));
