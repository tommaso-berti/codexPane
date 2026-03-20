# 7. Fonts


Free font services, like <u>[Google Fonts](https://fonts.google.com/)</u> and <u>[Adobe Fonts](https://fonts.adobe.com/)</u>, host fonts that you can link to from your HTML document with a provided <link> element.

You can also use fonts from paid font distributors like <u>[fonts.com](https://www.fonts.com/)</u> by downloading and hosting them with the rest of your site’s files. You can create a @font-face ruleset in your CSS stylesheet to link to the relative path of the font file.

## **Web Fonts Using <link>**

```
<head>
  <!-- Add the link element for Google Fonts along with other metadata -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
</head>

```


## **Web Fonts Using @font-face**
As mentioned earlier, fonts can be downloaded just like any other file on the web. They come in a few different file formats, such as:
* OTF (OpenType Font)
* TTF (TrueType Font)
* WOFF (Web Open Font Format)
* WOFF2 (Web Open Font Format 2)
The different formats are a progression of standards for how fonts will work with different browsers, with WOFF2 being the most progressive. It’s a good idea to include TTF, WOFF, and WOFF2 formats with your @font-face rule to ensure compatibility on all browsers.
Within the “Selected Families” section, you can use the “Download” button to download the font files to your computer.
When you have the files you need, move them to a folder inside your website’s working directory, and you’re ready to use them in a @font-face ruleset!

```
@font-face {
  font-family: 'MyParagraphFont';
  src: url('fonts/Roboto.woff2') format('woff2'),
       url('fonts/Roboto.woff') format('woff'),
       url('fonts/Roboto.ttf') format('truetype');
}

```

* The @font-face at-rule is used as the selector. It’s recommended to define the @font-face ruleset at the top of your CSS stylesheet.
* Inside the declaration block, the font-family property is used to set a custom name for the downloaded font. The name can be anything you choose, but it must be surrounded by quotation marks. In the example, the font is named 'MyParagraphFont', as this font will be used for all paragraphs.
* The src property contains three values, each specifying the relative path to the font file and its format. In this example, the font files are stored inside a folder named fonts within the working directory.
* Note that the ordering for the different formats is important because our browser will start from the top of the list and search until it finds a font format that it supports. Read more on format prioritization on <u>[CSS-Tricks](https://css-tricks.com/snippets/css/using-font-face-in-css/)</u>.

## **Fallback Fonts and Font Stacks**
Web safe fonts are good *fallback fonts* that can be used if your preferred font is not available.

```
h1 {
  font-family: Caslon, Georgia, 'Times New Roman';
}

```


## **Serif and Sans-Serif**
You may be wondering what features make a font similar to another font. The fonts Caslon, Georgia, and Times New Roman are *Serif* fonts. Serif fonts have extra details on the ends of each letter, as opposed to *Sans-Serif* fonts, which do not have the extra details.
In this final example, the font stack has 4 fonts. If the first 3 fonts aren’t available, the browser will use whatever serif font is available on the system.

```
h1 {
  font-family: Caslon, Georgia, 'Times New Roman', serif;
}


```

## Font-weight

```
left-section {
  font-weight: 700;
}

.right-section {
  font-weight: bold; 
}

```

It’s important to note that not all fonts can be assigned a numeric font weight, and not all numeric font weights are available to all fonts. It’s a good practice to look up the font you are using to see which font-weight values are available.
