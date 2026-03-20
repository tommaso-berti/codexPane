# 4. Visual rules - to do


## **[https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)**
## 
## Font family
## When setting typefaces on a web page, keep the following points in mind:
* The font specified must be installed on the user’s computer or downloaded with the site.
* <u>[Web safe fonts](http://www.cssfontstack.com/)</u> are a group of fonts supported across most browsers and operating systems.
* Unless you are using web safe fonts, the font you choose may not appear the same between all browsers and operating systems.
* When the name of a typeface consists of more than one word, it’s a best practice to enclose the typeface’s name in quotes, like so:

```
h1 {
  font-family: 'Courier New';
}

```


## Opacity
Opacity is the measure of how transparent an element is. It’s measured from 0 to 1, with 1 representing 100%, or fully visible and opaque, and 0 representing 0%, or fully invisible.
Opacity can be used to make elements fade into others for a nice overlay effect.

```
.overlay {
  opacity: 0.5;
}

```


## Background-image
CSS has the ability to change the background of an element. One option is to make the background of an element an image. This is done through the CSS property background-image.

```
.main-banner {
  background-image: url('https://www.example.com/image.jpg');
}

```


## Box-shadow
The box-shadow property in CSS adds shadows to elements.
### **Syntax**:

```
box-shadow: offset-x offset-y blur-radius spread-radius color;

```

**Parameters**:
- offset-x: Horizontal shadow offset. Positive values move the shadow to the right, negative to the left.
- offset-y: Vertical shadow offset. Positive values move the shadow down, negative up.
- blur-radius (optional): Blur of the shadow. Higher values make the shadow more blurred.
- spread-radius (optional): Expansion of the shadow. Positive values expand, negative contract.
- color: Color of the shadow.
- Insert: add inset before the values to create an inner shadow.
### **Example**:

```
box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);

```

This creates a blurred black shadow with a 5px offset in both directions.

