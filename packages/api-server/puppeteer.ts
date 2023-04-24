const puppeteer = require('puppeteer');

export async function scrapeWebsite() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.coles.com.au/on-special');

    console.log('PAGE',page);

    //  Get a screenshot of the page
    // await page.screenshot({ path: 'example.png', fullPage: true });

    //  Get a PDF of the page
    // await page.pdf({ path: 'example.pdf', format: 'A4' });

    //  Get HTML of the page
    const html = await page.content();

    //  Get text of the page
    // const title = await page.evaluate(() => document.title);

    console.log('hi here?')

    const quotes = await page.evaluate(() => {
        // Fetch the first element with class "quote"
        console.log('inside page.evaludate?')
        const quote = document.querySelector("price__value");
    
        // Fetch the sub-elements from the previously fetched quote element
        console.log('inside quotes>', quote)
    
    
        return { 'hi': 'h' };
    });

    //  Get text of the page
    // const text = await page.evaluate(() => document.body.innerText);

    //  Get all links
    // const links = await page.evaluate(() =>
    //   Array.from(document.querySelectorAll('a'), (e) => e.href)
    // );





    
    // // Save data to JSON file
    // fs.writeFile('courses.json', JSON.stringify(courses), (err:any) => {
    //   if (err) throw err;
    //   console.log('File saved');
    // });
  
    await browser.close();

    return 'test'
  }