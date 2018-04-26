#!/usr/bin/env node

const program = require('commander');
const pkg = require('./package');
const chalk = require('chalk');
const url = require('url');
const ipPattern = /^ip\-(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\-(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\-(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\-(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.[a-z\-\d]*\.compute\.internal$/;

program
  .version(pkg.version)
  .name(Object.keys(pkg.bin)[0])
  .arguments('<internalAwsUrl>')
  .usage('$0 <internalAwsUrl> | pbcopy')
  .description(pkg.description, {
    'internalAwsUrl': 'An AWS internal url in the form of http://ip-123-123-123-123.maybe-a-region.compute.internal'
  })
  .action((internalAwsUrl) => {
    let host = url.parse(internalAwsUrl).hostname;
    if (!host || !ipPattern.test(host)) {
      console.error(chalk.red(`Could not find an internal aws host in "${internalAwsUrl}"`));
      program.outputHelp();
      process.exit(1);
    }
    let ipParts = ipPattern.exec(host);
    let ip = [ipParts[1], ipParts[2], ipParts[3], ipParts[4]].join('.');
    process.stdout.write(`${ip}  ${host}`);


  })
  .parse(process.argv);


if (!process.argv.slice(2).length) {
  program.outputHelp();
}
