import puppeteer from "puppeteer";
import fs from "fs";
import _ from "lodash";
import seedrandom from "seedrandom";

jest.setTimeout(60000)

const BASE_URL = "http://localhost:3000";

describe("App.js", () => {
  let browser;
  let page;
  let laptopIds;

  async function fetchLaptopIds() {
    const result = await fetch(`${BASE_URL}/laptops/search?query=id,name,images,processor,graphics&limit=10&search=`)
    const json = await result.json()
    const items = json.items;
    laptopIds = items.map(item => item.id)
  }

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await fetchLaptopIds();

    const dirs = ["screenshots/details", "screenshots/details-expanded", "screenshots/comparison", "screenshots/comparison-expanded"]
    for (let dir of dirs) {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true });
      }
      fs.mkdirSync(dir, {
        recursive: true
      });
    }
  });

  beforeEach(() => {
    seedrandom('test', {global:true})
  });

  async function screenshot(path) {
    await page.waitForSelector(".app-title");

    // we're checking for the app title
    // it won't be shown if the page has an error
    const text = await page.$eval(".app-title", (e) => e.textContent);
    expect(text).toContain("Twój nowy");

    await page.screenshot({ path: path, fullPage: true });
  }

  async function comparisonCommon(fileName, directoryBase) {
    await page.waitForSelector(".comparison-table")
    await page.waitForSelector(".expandable-section")

    await screenshot(`screenshots/${directoryBase}/${fileName}.png`);

    await page.evaluate(async () => {
      const selectors = Array.from(document.querySelectorAll(".comparison-image"));
      await Promise.all(selectors.map(img => {
        if (img.complete) return new Promise(resolve => resolve());
        return new Promise((resolve, reject) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', reject);
        });
      }));
    });

    await page.evaluate(() => {
      let elements = document.querySelectorAll('.expandable-section');

      for (let element of elements)
        element.click();

      // wait for one second for the page to render correctly
      return new Promise(resolve => setTimeout(resolve, 1000));
    });
    await screenshot(`screenshots/${directoryBase}-expanded/${fileName}.png`);
  }

  it("details", async () => {
    const sample = Array.from(_.sampleSize(laptopIds, 10));
    for (let id of sample) {
      await page.goto(BASE_URL + "/details/" + id);

      await comparisonCommon(id, "details");
    }
  });


  it("comparison", async () => {
    const sample1 = Array.from(_.sampleSize(laptopIds, 10));
    const sample2 = Array.from(_.sampleSize(laptopIds, 10));
    for (let [id1, id2] of _.zip(sample1, sample2)) {
      await page.goto(BASE_URL + "/comparison/" + id1 + "/" + id2);

      await comparisonCommon(id1 + " " + id2, "comparison");
    }
  });

  it("main", async () => {
    await page.goto(BASE_URL);
    await screenshot('screenshots/main.png');
  });

  afterAll(() => browser.close());
});