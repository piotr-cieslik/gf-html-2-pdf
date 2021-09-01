# About

This repository contains Google Function that render PDF based on HTML content. The PDF is generated using Puppeteer library (https://github.com/puppeteer/puppeteer).

## Running locally
Steps to run the function locally:
1. Clone the repository.
1. Open console and go to root folder of the repository.
1. Run `npm install`.
1. Run `npm start`.

The function available at localhost under port 8080.

## Request format
To convert HTML to PDF it's necessary to send POST request with given JSON content.

``` js
{
    html: "" // Raw HTML content.
    pdfOptions: {} // Options object to pass to page.pdf() mehtod of Puppeteer.
}
```

Request example:
``` js
{
    html: "<p>Hello World</p>",
    pdfOptions: {
        landscape: true,
        format: "a4",
        margin: {
            left: "1cm",
            top: "1cm",
            right: "1cm",
            bottom: "1cm"
        }
    }
}
```