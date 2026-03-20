# 13. Buttons


In design, skeuomorphism is helpful for lowering the learning curve for users. If users can draw a metaphor between a familiar real-life object and an interface element, they are more likely to know how to use it without training. In the example of the button, if a web button appears similar to a real-life button on a physical interface, users can reliably figure out that the way to interact with the button is to press it.
*Flat design* is an alternative approach to skeuomorphism that embraces the fact that computer interfaces do not necessarily need to model real-life interfaces. As users grow more familiar with digital displays and interfaces, designers have felt less need to model physical interactions and instead rely on other signifiers to indicate interactive elements. To generalize, flat design uses simplicity and lack of clutter for its UI elements.

## **Buttons: Skeuomorphic styling**
Skeuomorphic button design aims to imitate the appearance and interactivity of a real-life button, often including a ‘raised’ appearance while the button is unpressed and a ‘pressed’ appearance when clicked.
For example, to implement a bare minimum 3-D button design, the following CSS ruleset could be used:

```
button {
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
  text-decoration: none;
  box-shadow: 0px 5px;
}

button:hover {
  cursor: pointer;
}

button:active {
  margin-top: 5px;
  color: black;
  box-shadow: 0px 0px;
}

```


## **Buttons: Flat Design**
Flat design is so-called because of its 2-D appearance. Elements appear flat on the screen, and designers must rely on other styling and signifiers to indicate clickability. In flat designs in particular, button text is very important for clarity—the possibility of user confusion is reduced by pairing buttons with specific, descriptive labels. A button with ‘Click here’ leaves many more open questions than a button that reads ‘Submit form’.

## **Buttons: Hover States**
Users expect buttons to be clickable. Since buttons can consist of any number of total elements (rectangular/circular body, text, image(s)), all elements should be clickable, should display their clickability, and should result in the same behavior.

## **Affordances, Signifiers, and Clickability**
### **Clickability**
For users on the web, the mouse click is perhaps the most fundamental human-computer interaction. The web *became* the web partially through the power of *hypertext*, or text in one document that links to other documents or resources. To this day, users navigate the web largely through mouse clicks (and finger taps on mobile and tablet devices).

### **Affordances**
Objects *afford* the ability of users to interact with them in various ways. For instance, a bench affords a person the ability to sit on it, but if it is not affixed to the ground, it also affords the user the ability to turn it over, throw (if the user is physically able), or perform any number of other actions. Even though the designer was probably not designing the bench with throwing in mind as the primary user behavior, the object still affords this action. Potentials for interaction are collectively called the *affordances* of an object.

### **Signifiers**
*Signifiers* are aspects of an object that a designer uses to indicate potential and intended affordances of an object. For example, a teacup with no handle affords the ability to lift it and drink out of it. But designers and potters often add handles to *signify* that users can and should lift up the object and take a sip. The handle is an example of a common *user experience pattern*.

### **UX Patterns**
User experience (UX) patterns establish reusable solutions to common problems. Handles are ubiquitous—they are used on objects of all shapes, sizes, and purposes to indicate that users can initiate an action by grabbing the handle with their hand(s).

### **Affordances and Signifiers in Web Design**
In computer interactions, the possible affordances of any computer are usually relatively limited. Consider a web application in a browser—a user can essentially click, execute key commands or type, and potentially execute touch events or voice commands. Because of the relatively limited range of affordances, using proper signifiers is especially important to direct users properly. Users can click anywhere on a page, but not every click will have a result. Often, websites and applications use a combination of visual feedback and common UX patterns to help solve this issue. In web browsers, one common example of visual feedback is the cursor image itself: it can demonstrate what behavior might be expected from a click: a pointing hand indicating that an interaction will occur, an i-beam shape indicating that text can be selected, a four-directional arrow showing that an element can be moved, and <u>[many more cursor styles and interactions](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)</u>.
As stated above, the hovering, pointing hand cursor is a nearly universal pattern to indicate that an element or text is clickable. But users do not want to hover a cursor over every element to determine if it is clickable, and mobile devices do not even have the ability to hover a cursor! For this reason, designers also use signifiers to demonstrate elements that afford interaction. On the web, these signifiers come in the form of CSS styles that differentiate clickable from non-clickable elements. A ubiquitous example is the styling of hyperlinks—hyperlinks should be easily differentiated from other text in a block by different colors, underline styles, or font weights.
There is no universal “right answer” to the issues surrounding signifiers and affordances on the web, but web designers should always keep these ideas in mind while creating web designs and interfaces.

* <u>[Signifiers, Not Affordances](https://jnd.org/signifiers-not-affordances/)</u> by Don Norman. This article discusses a bit of the history of thought around affordances and signifiers, and their importance in design.
* <u>[UI Patterns.com](http://ui-patterns.com/)</u> has many examples of solutions to common design patterns in web design.


