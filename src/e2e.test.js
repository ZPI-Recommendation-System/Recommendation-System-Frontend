import puppeteer from "puppeteer";

describe("App.js", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("screenshot 213", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".app-title");
    
    // we're checking for the app title
    // it won't be shown if the page has an error
    const text = await page.$eval(".app-title", (e) => e.textContent);
    expect(text).toContain("Twój nowy");

    await page.screenshot({path: 'screenshots/page.png'});
  });

  afterAll(() => browser.close());
});