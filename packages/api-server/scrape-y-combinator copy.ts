const puppeteer = require("puppeteer");

export interface IProductData {
  url: string | null;
  text: string;
  imageUrl: string;
}

export function runScraperColes(search: string) {
  return new Promise<IProductData[]>(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`https://www.coles.com.au/search?q=${search}`);
      let urls: IProductData[] = [];
      let newUrls = await page.evaluate(() => {
        let results: IProductData[] = [];

        let items = document.querySelectorAll("div.row > section");
        items.forEach((item) => {
          results.push({
            url: item.getElementsByClassName("product__link")[0].getAttribute("href"),
            text: item.getElementsByClassName("product__title")[0].innerHTML,
            imageUrl: item.getElementsByTagName("img")[1].src,
          });
        });
        return results;
      });

      urls = urls.concat(newUrls);
      browser.close();
      return resolve(urls);
    } catch (e) {
      console.log("error...", e);
    }
  });
}
