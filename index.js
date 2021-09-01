const puppeteer = require('puppeteer');

// Cache browser instance to speed up PDF generation.
let browserCache = null;

const newPage = async function(){
  if(browserCache == null){
    browserCache = await puppeteer.launch({ args: ['--no-sandbox'] });
  }

  const browser = browserCache;
  const page = await browser.newPage();
  return page;
};

const createPdf = async function(html, pdfOptions){
  const page = await newPage();
  // Wait until page content is fully loaded.
  // https://pptr.dev/#?product=Puppeteer&version=v10.0.0&show=api-pagesetcontenthtml-options
  await page.setContent(html, {
    waitUntil: ["load"],
  });
  const pdf = await page.pdf(pdfOptions);
  await page.close();
  return pdf;
};

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
 exports.run = (req, res) => {
    if(req.method == "GET"){
      res.status(200).send("Please send your HTML content using POST method.");
      return;
    }

    if(req.method != "POST") {
      res.status(500).send("Unsuported HTTP method");
    }

    const html = req.body.html;
    const pdfOptions = req.body.pdfOptions || {};
    if(!html){
      res.status(400).send("Html content was not specified.");
      return;
    }

    createPdf(html, pdfOptions)
      .then(pdf => res.status(200).contentType('application/pdf').send(pdf))
      .catch(() => {
        // TODO Should we close browser and recreate it in next request?
        res.status(500).send("Unknown server error.");
      });
  };
  