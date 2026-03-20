# 7. Font awesome


Icons are small symbols used on many websites to convey information, often without text. Most people associate a few commonly used icons with specific software actions. For example, the floppy disk icon is commonly associated with saving a document 

## **Link Font Awesome**
The Font Awesome library is linked to an HTML document using the <link> tag. The library can be linked from a CDN or saved and linked to a local file.
When linking to a CDN, we recommend using the <u>[Bootstrap CDN](https://www.bootstrapcdn.com/fontawesome/)</u>, which hosts a copy of the Font Awesome library. The file is referenced using the <link> tag in the head of the HTML document:

```
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css">
</head>

```

When linking to a local version of Font Awesome, you should <u>[download](http://fontawesome.io/get-started/)</u> the most up-to-date file. The Font Awesome css file can then be added to the current project directory. The <link> tag is used to reference the Font Awesome CSS file.

```
<head>
  <link rel="stylesheet" href="resources/css/fontawesome.css">
</head>

```

In the example above, a local version of Font Awesome is linked in the head of the HTML document. The href value is a path to the local Font Awesome CSS file. The css folder in the downloaded fontawesome-5.15.4 directory was dragged into resources, a local directory for storing additional styling resources. Notice the rest of the path, css/fontawesome.css, is the same as the CDN.

## **Add Font Awesome Icon**
Font Awesome icons are saved as CSS classes. They are placed into an HTML document by adding an <i> tag with two classes: fa and fa-icon-name, where fa-icon-name refers to the icon-specific class name.

```
<i class="fa fa-save"></i>

```

In the example above, the <i> tag’s class is fa fa-save. The fa class is required for all Font Awesome icon elements. It provides standard size and display values for the icon, without which, the icon would not appear properly. The fa-save class references the floppy disc image. If Font Awesome is correctly loaded in the head of the document, the floppy disc icon will appear on the HTML page.
Use the Font Awesome <u>[cheat sheet](http://fontawesome.io/cheatsheet/)</u> to find Font Awesome icons and their matching classes.

## **Icon Sizing**
Icon size can be increased by 33% with fa-lg, two times with fa-2x, three times with fa-3x, four times with fa-4x, or five times with fa-5x.

```
<i class="fa fa-camera fa-lg"></i>
<i class="fa fa-cab fa-4x"></i>

```

