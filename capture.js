import { setTimeout } from "node:timers/promises";
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

  const recorder = await page.screencast({ path: 'title.webm' });
  await setTimeout(3000);

  await page.evaluate(() => {
      document.body.style.transition = 'opacity 2s';
      document.body.style.opacity = '1';
  });

  await setTimeout(3000);

  await page.evaluate(() => {
      document.body.style.transition = 'opacity 2s';
      document.body.style.opacity = '0';
  });

  await setTimeout(3000);

  await recorder.stop();
  await page.close();
  await browser.close();
}

capture();
