# 5. Semantic HTML


By using Semantic HTML, we select HTML elements based on their meaning, not on how they are presented. Elements such as <div> and <span> are not semantic elements since they provide no context as to what is inside of those tags.
For example, instead of using a <div> element to contain our header information, we could use a <header> element, which is used as a heading section. By using a <header> tag instead of a <div>, we provide context as to what information is inside of the opening and closing tag.
**Why use Semantic HTML?**
* **Accessibility:** Semantic HTML makes webpages accessible for mobile devices and for people with disabilities as well. This is because screen readers and browsers are able to interpret the code better.
* **SEO:** It improves the website SEO, or *Search Engine Optimization*, which is the process of increasing the number of people that visit your webpage. With better SEO, search engines are better able to identify the content of your website and weight the most important content appropriately.
* **Easy to Understand:** Semantic HTML also makes the website’s source code easier to read for other web developers.

## <header></header>
Let’s take a look at some semantic elements that assist in the structure of a web page. A header is a container usually for either navigational links or introductory content containing <h1> to <h6> headings.

### <nav></nav>
Used to define a block of navigation links such as menus and tables of contents. It is important to note that <nav> can be used inside of the <header> element but can also be used on its own.

## <main></main>
Used to encapsulate the dominant content within a webpage. This tag is separate from the footer and the <nav> of a web page since these elements don’t contain the principal content

## <footer></footer>
## **The content at the bottom of the subject information is known as the** *footer***, indicated by the** 
The footer contains information such as:
* Contact information
* Copyright information
* Terms of use
* Site Map
* Reference to top of page links

## <section></section>
Defines elements in a document, such as chapters, headings, or any other area of the document with the same theme. For example, content with the same theme such as articles about cricket can go under a single <section>

## **<article></article>**
Holds content that makes sense on its own. <article> can hold content such as articles, blogs, comments, magazines, etc. An <article> tag would help someone using a screen reader understand where the article content (that might contain a combination of text, images, audio, etc.) begins and ends.

## **<aside></aside>**
Used to mark additional information that can enhance another element but isn’t required in order to understand the main content. This element can be used alongside other elements such as <article> or <section>. Some common uses of the <aside> element are for:
* Bibliographies
* Endnotes
* Comments
* <u>[Pull quotes](https://en.wikipedia.org/wiki/Pull_quote)</u>Editorial sidebars
* Additional information

```
<article>
  <p>The first World Series was played between Pittsburgh and Boston in 1903 and was a nine-game series.</p>
</article>
<aside>
  <p>
   Babe Ruth once stated, “Heroes get remembered, but legends never die.” 
  </p>
</aside>

```


## **<figure></figure>**
Used to encapsulate media such as an image, illustration, diagram, code snippet, etc, which is referenced in the main flow of the document.

```
<figure>
  <img src="overwatch.jpg">
</figure>

```


### <figcaption></figcaption>
Used to describe the media in the <figure> tag. Usually, <figcaption> will go inside <figure>. This is different than using a <p> element to describe the content; if we decide to change the location of <figure>, the paragraph tag may get displaced from the figure while a <figcaption> will move with the figure.

```
<figure>
  <img src="overwatch.jpg">
  <figcaption>This picture shows characters from Overwatch.</figcaption>
</figure>

```


## <audio></audio>
Used to embed audio content into a document. Like <video>, <audio> uses src to link the audio source. Then we specified the type by using type and named what kind of audio it is. Although not always necessary, it’s recommended that we state the type of audio as it helps the browser identify it more easily and determine if that type of audio file is supported by the browser.
* controls: automatically displays the audio controls into the browser such as play and mute.
* src: specifies the URL of the audio file.

```
<audio>
  <source src="iAmAnAudioFile.mp3" type="audio/mp3">
</audio>

```


## <video></video
The <video> element makes it clear that a developer is attempting to display a video to the user.
Some attributes that can alter a video playback include:
* controls: When added in, a play/pause button will be added onto the video along with volume control and a fullscreen option.
* autoplay: The attribute which results in a video automatically playing as soon as the page is loaded.
* loop: This attribute results in the video continuously playing on repeat.

```
<video src="coding.mp4" controls>Video not supported</video>

```

