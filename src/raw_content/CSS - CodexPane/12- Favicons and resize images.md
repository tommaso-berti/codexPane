# 12. Favicons and resize images


* JPEG - a highly compressible file type that is preferred for images with significant detail
* PNG - a file type that is lossless (meaning that full quality is maintained) - generally preferred for images with less detail such as logos
* SVG - useful for high resolution screens, scalable vector graphics (SVG) will change size (scale) for various screen sizes; SVGs also contain roughly 50% less data than their JPEG or PNG equivalents allowing web pages to load more quickly; they are becoming widely used for simple images such as icons and logos

## Favicon
### **Making favicons using** **[favicon-generator.org](http://favicon-generator.org)**
Favicon is a small image displayed in the tab or browser bar containing the name of the page being viewed.

### **Add the favicon to your web page**
Add the file to your project directory and add this code to the <head> of your HTML document.

```
<link rel="icon" href="./<favicon-name>.ico" type="image/x-icon">

```


## **Editing Images**
### **Edit and Crop an Image with** **[Pixlr](https://pixlr.com/editor/)**

## **Converting to Scalable Vector Format**
If you have an image that is relatively simple and you want it to scale well on screens with high resolutions, you may wish to convert it to SVG format. To convert an image to SVG, you can use an online conversion tool such as <u>[online-convert](http://image.online-convert.com/convert-to-svg)</u>.