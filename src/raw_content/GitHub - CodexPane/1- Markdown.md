# 1. Markdown



```
Title of My Document
====================

```


Oppure

```
# Title of My Document

```



```
Sub-Title of My Document
------------------------

```



```
My Todo List
============

At the end of this **week**, I plan to:

1. Learn Markdown
2. Write Markdown
3. Share a Markdown note

My favorite quote is:
> If you didn't get it the first time
> Do not despair
> Try and try again
> ~ Anonymous

```


The HTML equivalent to the above would be:

```
<h1>My Todo List</h1>
<p>At the end of this <strong>week</strong>, I plan to:</p>
<ol>
  <li>Learn Markdown</li>
  <li>Write Markdown</li>
  <li>Share a Markdown note</li>
</ol>
<p>My favorite quote is:</p>
<blockquote>
  <p>
    If you didn't get it the first time<br>
    Do not despair<br>
    Try and try again<br>
    ~ Anonymous
  </p>
</blockquote>

```


Contrary to popular belief, Markdown is not a document format. Therefore, it doesn’t require a strict file extension naming convention, such as **.md**. As the <u>[official Markdown mailing list](https://superuser.com/questions/249436/file-extension-for-markdown-files)</u> explains, Markdown isn’t meant to take over the format of a file. Any file extension that you would normally use to name your text document such as **.txt** or **.text** is appropriate. However, organizations such as <u>[GitHub](https://guides.github.com/features/mastering-markdown/)</u> have a preference to expect Markdown documents to appear with an **.md** or **.markdown** extension.

A Markdown parser is software written to parse the Markdown syntax in a text document and convert it to HTML syntax. The original Markdown parser was written in Perl, but you can find parser <u>[implementations](https://github.com/markdown/markdown.github.com/wiki/Implementations)</u> today in almost any programming language. Regardless, a basic Markdown parser should support the <u>[core Markdown syntax](https://daringfireball.net/projects/markdown/basics)</u>: paragraphs, headers, blockquotes, phrase emphasis, lists, code, images, and links.
There are Markdown parsers that are freely available on the Web: <u>[StackEdit.io](https://stackedit.io/app#)</u>, <u>[Dillinger](http://dillinger.io/)</u>, <u>[Parse](https://parsedown.org/demo)</u> and <u>[Markdown to HTML Converter](https://markdowntohtml.com/)</u>. In addition to parsing and rendering, both Parse and Markdown to HTML Converter also convert the Markdown document to raw HTML so that you can copy and paste the HTML to be used elsewhere.

### **Markdown Cheatsheet GitHub**
[https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

## README.md in GitHub
### **Conventions of a Good README File**
Your README file should be as good as your project itself.
Make your project stand out and look professional by at least including the following elements in your README:
* **Project Title**: the name of your project
* **Description**: This is an extremely important component of the README. You should describe the main purpose of your project. Answer questions like “why did you build this project?” and “what problem(s) does it solve?”. It also helps to include your motivations for the project and what you learned from it.
* **Features**: If your project has multiple features, list them here. Don’t be afraid to brag if your project has unique features that make it stand out. You can even add screenshots and gifs to show off the features.
* **How to use**: Here, you should write step-by-step instructions on how to install and use your project. Any software or package requirements should also be listed here.
* **Technologies**: List all the technologies and/or frameworks you used and what purpose they serve in your project.
* **Collaborators**: If others have contributed to your project in any way, it is important to give them credit for their work. Write your team members’ or collaborators’ names here along with a link to their GitHub profile.
* **License**: It’s also important to list a license on your README so other developers can understand what they can and cannot do with your project. You can use <u>[this guide](https://choosealicense.com/)</u> to help you choose a license.
Keep READMEs brief but detailed. README should always be up-to-date and self-explanatory. If you have spent a lot of time on your project, you should also spend a good chunk of time on the README. It can help your future self as well when you step away for a while and need to get reacquainted with your project. Not to mention it’ll leave a positive impression on future interviewers who look at your GitHub profile.
Keep in mind that nobody wants to read a long block of unformatted text bloated with information. That is why a README file usually has the .md extension. Formatting README files with Markdown can give them flair and make them interesting to read.

Useful docs
https://www.codecademy.com/resources/docs