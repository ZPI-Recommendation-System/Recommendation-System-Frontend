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

    const dirs = [
      "screenshots/details", 
      "screenshots/details-expanded", 
      "screenshots/comparison", 
      "screenshots/comparison-expanded", 
      "screenshots/results"]
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

  async function waitForImages(selector) {
    return await page.evaluate(async selector => {
      const selectors = Array.from(document.querySelectorAll(selector));
      await Promise.all(selectors.map(img => {
        if (img.complete) return new Promise(resolve => resolve());
        return new Promise((resolve, reject) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', reject);
        });
      }));
    }, selector);
  }

  async function comparisonCommon(fileName, directoryBase) {
    await page.waitForSelector(".comparison-table")
    await page.waitForSelector(".expandable-section")

    await screenshot(`screenshots/${directoryBase}/${fileName}.png`);

    await waitForImages(".comparison-image");

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

  function randomFormData() {
    function randomBool() {
      // small chance to make most of the choices false
      return Math.random() < 0.1;
    }
    return {
    "usageType": _.sample([
      'Aplikacje biurowe i internet',
      'Gry indie i retro',
      'Modelowanie 3D i digital art',
      'Najnowsze gry wysokobudżetowe',
    ]),
    "dataPreferences": {
      "diskDrive": randomBool(),
      "sdCardReader": randomBool()
    },
    "preferredScreenSizes": [],
    "screenPreferences": {
      "touchScreen": randomBool(),
      "HDMI": randomBool(),
      "otherVideoConnectors": randomBool()
    },
    "internetPreferences": {
      "simCard": randomBool(),
      "lanPort": randomBool()
    },
    "ramInUnits": _.random(0, 16),
    "minDiscSize": _.random(100, 2000),
    "maxPricePLN": _.random(1000, 16000),
    "batteryRunTime": _.random(1, 6),
  }
}

  it("results", async () => {
    for (let i=0; i<10; i++) {
      await page.goto(BASE_URL + "/results");
      const formData = randomFormData();
      await page.evaluate(formData => {
        window.mockFormData(formData);
      }, formData);
      await page.waitForSelector(".selection-section");
      await waitForImages(".selection-laptop-image");

      await screenshot(`screenshots/results/${i}.png`);
      
      // cleanup
      await page.evaluate(() => {
        window.mockFormData(null);
      });
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
