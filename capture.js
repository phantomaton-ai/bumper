import path from 'path';
import puppeteer from 'puppeteer';

async function capture() {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: {
      width: 1280,
      height: 720,
    },
    args: ['--use-gl=egl']
  });
  const page = await browser.newPage();
  await page.goto(`file://${import.meta.dirname}/title.html`);
  await page.waitForTimeout(3000); // Wait 3 seconds before fade in

  await page.evaluate(() => {
      document.body.style.transition = 'opacity 2s';
      document.body.style.opacity = '1';
  });

  await page.waitForTimeout(3000); // Wait another 3 seconds before fade out

  await page.evaluate(() => {
      document.body.style.transition = 'opacity 2s';
      document.body.style.opacity = '0';
  });

  await page.waitForTimeout(2000); // Wait 2 seconds for fade out

  await page.close();
  await browser.close();
}

capture();
