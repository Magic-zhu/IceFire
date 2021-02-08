const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

// lighthouse 性能检测
const analyse = async (url: string) => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance'],
    port: chrome.port,
  };
  const runnerResult = await lighthouse(url, options);
  await chrome.kill();
  const result = {
    score: runnerResult.lhr.categories.performance.score,
    audits: runnerResult.lhr.audits,
  };
  return Promise.resolve(result);
};
module.exports = {
  analyse,
};
