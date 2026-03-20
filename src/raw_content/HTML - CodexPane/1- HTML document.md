# 1. HTML document


This declaration is an instruction, and it must be the first line of code in your HTML document. It tells the browser what type of document to expect, along with what version of HTML is being used in the document. For now, the browser will correctly assume that the html in <!DOCTYPE html> is referring to HTML5, as it is the current standard.

```
<!DOCTYPE html>
<html>

</html>

```


## Website common document hierarchy 
When making multi-page static websites, web developers often store HTML files in the *root directory*, or a main folder where all the files for the project are stored. As the size of the projects you create grows, you may use additional folders within the main project folder to organize your code.

```
project-folder/
|—— about.html
|—— contact.html
|—— index.html

```


# Document structure

## <html></html>
The first tag to be inserted in a HTML file. This means that the content inside will be of type HTML
## 
## <head></head>
Contains the *metadata* for a web page. Metadata is information about the page that isn’t displayed directly on the web page. Unlike the information inside of the <body> tag, the metadata in the head is information about the page itself

### <title></title>
A browser’s tab displays the title specified in the title tag. The <title> tag is always inside of the <head>.

## <body></body>
Contains the main body of the page

## <footer></footer>
Contains the footer of the page

## <section></section>
The <section> element is used to define a thematic grouping of content, typically with a heading. It indicates that the content within is related and forms a distinct section of the document.
Use <section> for semantically meaningful content groupings, and <div> for generic containers.