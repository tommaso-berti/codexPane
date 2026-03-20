# 6. Digital accessibility


Accessibility refers to designing devices, products, and environments such that individuals with disabilities or sensory impairments can successfully use the device or product. [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG21/)
The requirements for accessibility in digital media are, of course, very different, however.
Some examples include (but are not limited to):
* Screen readers that parse a website for a user with visual impairments
* Videos on websites are closed-captioned for individuals with hearing impairments
* Images include “alt text” for individuals with visual impairments
* Websites must be navigable by keyboard for users who may not be able to operate a mouse (i.e., navigating using the “Tab” on a keyboard)

## Contrast
Careful use of contrast will aid all users in skimming or navigating our pages, by directing our user’s attention, and by visually communicating what is most important and what is not as important.
Making sure that enough contrast exists between different elements can help us ensure that our site is accessible to users with vision impairments.
In this lesson, we will cover creating accessibility-enhancing contrast through:
* Headings
* Font choices
* Color

### Headings
In HTML, there are six heading elements, <h1> - <h6>. The heading elements decrease in importance and size as the heading number increases. This means that an <h1> carries a higher rank than an <h6>.
Heading elements in HTML accomplish several things:
* they create structure, dividing your page into groups of increasingly specific content
* they create visual contrast, with lower-numbered headers like h1 displaying in a larger and more striking format
* they provide navigation and contextual information to web browsers, plugins, and assistive technologies like screen readers.
As an added benefit, having a keyword in an h1 tag will typically impact search results more than having the same keyword in a p tag, because it is assumed that words used in your main heading are very important to the topic of your entire website.
Heading elements should be used in order and it is considered best practice not to skip heading elements when possible.
**Note that each web page should only contain one <h1> element.**
This <h1> is considered the label for the entire document and it should clearly define the purpose of the web page. After that, we use the <h2> element to assign the same level of importance to each sibling section.

### **Font Accessibility**
Highly accessible websites use real text instead of images of text, use text with high contrast with its background, and choose highly legible font sizes.
**Real text vs text within images**
Using real text instead of text within graphics provides a website with several key benefits:
* screen readers can transform the text into a voice-over
* users can scale or magnify the text for better legibility without losing image quality
* it’s less taxing on the browser to load real text versus requesting large image assets from a server
**Contrasting colors**
[https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)
Text is much easier to read when there is a high level of contrast between the text and the text’s background color. According to the Web Content Accessibility Guidelines, a ratio of at least 4.5:1 should be used on all standard text sizes. This means the lighter color must have four and a half times the luminance of its paired darker color.
Readability can be preserved with less contrast for larger font sizes, 24 pixels or larger. A ratio of at least 3:1 should be used for larger text sizes.
**Font sizes**
The standard font size for most modern web browsers is 16 pixels. This allows users to scan your website and consume information without straining their eyes. While smaller type sizes can be used, they should be reserved for nonessential content or design aesthetic only.

### **Color Accessibility**
For instance, using the combination of black (#000000) as a foreground color and white (#ffffff) as a background color provides maximum contrast. While this is a fairly common color combination for text on a page, the high contrast can also cause glare that will increase strain on the user’s eyes over time.
**Color Blindness**
There are many forms of color blindness. The most common is red-green color blindness, where those two colors are often indistinguishable. For instance, if a red-green colorblind user is looking at the color purple, it may appear blue as they do not perceive the red pigment. People can also have blue-yellow color vision deficiency, and total color blindness, however, these affect a much smaller percentage of the population.
Here are some practical steps you can take to improve the color accessibility of your design:
* Choosing highly contrasting colors (opposite from each other on a <u>[color wheel](https://en.wikipedia.org/wiki/Color_wheel)</u>) will aid users with partial color blindness.
* Using a color scheme with multiple shades of brightness for a single color will create contrast for users with partial or total color blindness. Think about how it would look in grayscale: light blue would still be differentiable from dark blue.
* Pairing color with other forms of conveying information (text, icons, etc) is the most general solution. For example, an invalid entry in a form on a website should not just turn the entry field red, it should also display text that explains the error.
Color is a valuable tool for conveying information, but it should never be the only tool that your site uses to communicate any essential content.
<u>[Toptal](https://www.toptal.com/designers/colorfilter)</u> has created a colorblind web page filter tool to test your designs with different types of color blindness.

### **Best Practices**
**Text Overlaid on Images**
White text overlaid on an image is a popular design trend. However, it doesn’t adhere to standards as the contrast is often too low. Adding a dark transparent overlay on top of the image could increase the contrast and provide better legibility.
**Removing Input Labels**
Another trend often seen in web design is the removal of labels above input fields, sometimes relying on placeholder text instead to identify the input field.
While this enhances the aesthetic quality of a design in some instances, it can hinder a user’s ability to identify which input they are attempting to fill out. This is particularly true for low vision users because the placeholder text is often light gray and low contrast. This also creates problems for users employing screen readers, because the form’s placeholder text is not always narrated.
**Buttons and Links**
There has been a trend towards <u>[flat and minimal design ](https://www.nngroup.com/articles/flat-design/)</u>in recent years. This trend has improved usability in some ways, as it has encouraged designers to remove visual effects that are not contributing to the usability of their site.
However, minimalism can go too far, especially if it obscures how users should navigate the site. Visual contrast is especially important for buttons and links because these are the tools our users employ to navigate. Color alone should not be used to indicate clickability, as this will cause challenges for low vision and color-blind users.

## **Semantic HTML Elements**
For example, developers should wrap a navigation bar in a <header> element. Although the navigation bar could be wrapped in a <div> element with a class="header", the *native semantics* of a <header> element allows someone using a screen reader to understand and navigate a web page more efficiently.

## **ARIA Role**
To help add context to web page information, ARIA provides an HTML attribute called role. The value of an element’s role changes how a screen reader communicates the element.
Some type of roles are: button, navigation, main, complementary, presentation
### **ARIA Role: Complementary**

```
<div id="code-editor" role="complementary">
  ...
</div>

```

The role="complementary" attribute and value can help a screen reader user understand that the information in the code editor is *complementary* (or supporting) to the information you are reading right now. It helps users of screen readers identify the relationship between the two sections of the page.
### **ARIA Role: Presentation**
Some HTML elements, like <ul> and <ol>, only serve to organize information on a web page. When a screen reader navigates a page, however, it reads out to the user each element’s name as it encounters them. Therefore, reading “ol“ outloud will slow down visually impaired users. We can instruct screen readers to skip reading unnecessary elements by setting the role attribute to presentation. 

```
<ol role="presentation">
  <li>List Item 1</li>
  <li>List Item 2</li>
</ol>

```

In the example above, the <ol> element is assigned a role of presentation, meaning a screen reader will not read the element’s name (“ordered list”). Adding role="presentation" to an <ol> tag will cause the screen reader to skip directly to the text between the <li> tags (it will not read the names of the <li> elements).

```
<div id="container" role="presentation">
  <p>I'm content you want to hear!</p>
</div>

```

In the example above, a screen reader won’t read “div” outloud, but it will read the name of the paragraph element and the content of the paragraph. This happens because the paragraph is not a necessary child of the div.

## **ARIA Properties**
### **aria-labels**
The property aria-label gives the screen reader additional information to read out loud to the user.

```
<img src="#" alt="A painting of the Shenandoah Valley"/>
<p aria-label="Artist">Armand Cabrera, 2010</p>

```

In the improved HTML above, a user of a screen reader will know how this paragraph relates to the image above it. For a complete list of ARIA properties, visit the following resource: <u>[ARIA Techniques](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques)</u>

### **Alt Attribute**
The alt attribute is used to describe an image (or several other elements). A screen reader will read the value of the alt attribute out loud. However, if the element cannot be visually seen — whether it is because the user is visually impaired, an incorrect source is referenced, or the page is being accessed over a slow connection — the alt attribute will be displayed in its place. The value of aria-label will never be displayed on the screen and is a better choice for elements that do not support the alt attribute.

```
<img src="#" alt="a kitten snuggling a puppy"/>

```

In the example above, a screen reader will read out loud “image: a kitten snuggling a puppy” to the user. If the image doesn’t load properly, the browser will display this text as a tooltip.
Alt attribute writing conventions:
* In general, the value of alt should concisely describe the image.
* For images that are also <a> elements, the alt attribute should describe the source that the link targets.
* If an image conveys no information (such as a decorative border), the alt attribute should be empty, but should never be omitted.
* If an image is described by text near the image, do not duplicate the description in the alt attribute. Use an empty alt attribute instead.
* The value of an alt attribute should be no more than 150 characters.

## Screen readers
The screen reader provides a text-to-speech (TTS) experience for the user to translate the information on the screen into speech, which can be heard through speakers, headphones or braille.
### 
### **(OS X) VoiceOver**
Apple computers come with a screen reader built in, called VoiceOver. You can access it easily by pressing Command-F5. If VoiceOver is on, pressing Command-F5 turns it off.
### 
### **(Windows) NVDA**
NVDA (NonVisual Desktop Access) is a free screen reader for Windows, which allows blind and vision-impaired people to use computers. It reads the text on the screen in a computerized voice.
### 
### **(Google Chrome) ChromeVox**
ChromeVox is built using only web technologies like HTML5, CSS, and Javascript. ChromeVox (Classic) was designed from the start to enable unprecedented access to modern web apps, including those that utilize W3C ARIA (Access to Rich Internet Applications) to provide a rich, desktop-like experience.