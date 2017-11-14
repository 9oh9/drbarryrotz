"use strict";

const Handlebars = require('handlebars');
const glob = require('glob');
const fs = require('fs');

const files = glob.sync('templates/**/*.hbs');
const header = fs.readFileSync('templates/header.html', { encoding: 'utf8' });
const footer = fs.readFileSync('templates/footer.html', { encoding: 'utf8' });

files.forEach(f => {
  let tmp = Handlebars.compile(fs.readFileSync(f, { encoding: 'utf8' }));
  let fileName = f.replace('templates', 'build').replace('hbs', 'html');
  console.log(`Writing template: ${f} to file: ${fileName}`);

  fs.writeFileSync(fileName, tmp({ header, footer }));
});

console.log('Build finished successfully.');
process.exit(0);
