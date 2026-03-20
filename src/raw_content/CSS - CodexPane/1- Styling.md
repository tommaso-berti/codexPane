# 1. Styling


## Inline styling
Fortunately, HTML allows you to write CSS code in its own dedicated section with a <u>[<style>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style)</u> element nested inside of the element. The CSS code inside the <style> element is often referred to as an *internal stylesheet*.
An internal stylesheet has certain benefits and use cases over inlines styles, but once again, it’s not best practice.
To create an internal stylesheet, a <style> element must be placed inside of the <head> element.

```
<head>
  <style>
    p {
      color: red;
      font-size: 20px;
    }
  </style>
</head>

```


## External stylesheet
### Linking the stylesheet
You can use the <link> element to link HTML and CSS files together. The <link> element must be placed within the head of the HTML file. It is a self-closing tag and requires the following attributes:
* href — like the anchor element, the value of this attribute must be the address, or path, to the CSS file.
* rel — this attribute describes the relationship between the HTML file and the CSS file. Because you are linking to a stylesheet, the value should be set to stylesheet.

Link via URL

```
<link href='https://www.codecademy.com/stylesheets/style.css' rel='stylesheet'>

```


Link via folder path (in this case a relative path in which the .css file is in the same folder of the index.html)

```
<link href='./style.css' rel='stylesheet'>

```

