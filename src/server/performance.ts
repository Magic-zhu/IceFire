const lighthouse = require('lighthouse');
const puppeteer = require('puppeteer');

interface AnalyseOptions {
  mode: string;
}
// 分析主方法
const analyse = async (url: string, analyseOptions: AnalyseOptions) => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(url);
  const rs = await page.metrics();
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance'],
    // emulatedFormFactor: 'desktop',
    port: new URL(browser.wsEndpoint()).port,
  };
  const runnerResult = await lighthouse(url, options);
  await browser.close();
  const result = {
    score: runnerResult.lhr.categories.performance.score,
    audits: runnerResult.lhr.audits,
    metrics: rs,
  };
  return Promise.resolve(result);
};

// dom相关检测
const DomGathering = async () => {};

// lighthouse相关检测
const lighthouseGathering = async () => {};

// 页面请求相关检测
const networkGathering = async () => {};

module.exports = {
  analyse,
};
