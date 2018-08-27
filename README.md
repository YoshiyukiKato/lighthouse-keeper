# lighthouse-keeper
[![npm](https://img.shields.io/npm/v/lighthouse-keeper.svg)](https://www.npmjs.com/package/lighthouse-keeper)
[![CircleCI](https://circleci.com/gh/YoshiyukiKato/lighthouse-keeper.svg?style=shield)](https://circleci.com/gh/YoshiyukiKato/lighthouse-keeper)
[![codecov](https://codecov.io/gh/YoshiyukiKato/lighthouse-keeper/branch/master/graph/badge.svg)](https://codecov.io/gh/YoshiyukiKato/lighthouse-keeper)
[![codebeat badge](https://codebeat.co/badges/1ae3874c-ce60-4e2f-a4ca-64d8b0cedc53)](https://codebeat.co/projects/github-com-yoshiyukikato-lighthouse-keeper-master)
[![Greenkeeper badge](https://badges.greenkeeper.io/YoshiyukiKato/lighthouse-keeper.svg)](https://greenkeeper.io/)

A wrapper tool of [lighthouse](https://github.com/GoogleChrome/lighthouse) to collect multiple web-site performance data.

## use from cli
```terminal
$ npm i -g lighthouse-keeper
```

```terminal
$ lhk --config [path to config]
```

## use from program
```terminal
$ npm i lighthouse-keeper
```

```js
const lhk = require("lighthouse-keeper");
const config = require("./path/to/config");

lhk.exec(config)
  .then((context) => {
    console.log(context.getResults());
  })
  .catch((err) => {
    console.error(err);
  });
```

## configuration

```js
{
  targets: [{ url: "https://google.com" }...],
  reporters: [Reporter...],
  chromeNum: 2,
  puppeteerConfig: {puppeteerConfig},
  lighthouseConfig: {lighthouseConfig}
}
```

### targets [required]
Array of target to perform audits by lighthouse. 
The target object must contains `url` property as follows:

```js
{ url: "https://google.com" }
```

#### use csv target list
```csv
url
https://google.com
```

```js
const {readCsvTargetList} = require("lighthouse-keeper").config;

module.exports = {
  targets: readCsvTargetList("/path/to/*.csv"),
  ...
}
```

### reporters [required]
Array of Reporter instance.

#### use built-in reporters
There are two built-in reporters; `JsonReporter` and `CsvReporter`.

```js
const {JsonReporter,CsvReporter} = require("lighthouse-keeper").reporter;

module.exports = {
  targets: [{ url: "https://google.com" }...],
  reporters: [
    new JsonReporter("path/to/output.json"),
    new CsvReporter("path/to/output.csv")
  ],
  ...
}
```

#### use custom reporters

```js
const {Reporter} = require("lighthouse-keeper").reporter;

class MyReporter extends Reporter{
  constructor(){
    super();
  }
  open(){...}
  write(){...}
  close(){...}
}
```

```js
const MyReporter = require("path/to/my-reporter");

{
  targets: [{ url: "https://google.com" }...],
  reporters: [
    new MyReporter()
  ],
  ...
}
```


### chromeNum [option]
Number of chromes to launch for running lighthouse.  
This parameter is optional. Default value is `1`;

### puppeteerConfig [option]
Object of options to launch chrome via puppeteer. See [launch config of puppeteer](https://github.com/GoogleChrome/puppeteer/blob/v1.7.0/docs/api.md#puppeteerlaunchoptions)  
This parameter is optional. Default value is follows:

```js
{
  headless: true
}
```

### lighthouseConfig [option]
Object of options to run lighthouse. See [config of LightHouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md)  
This parameter is optional. Default value is follows:

```js
{
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance'],
  }
}
```