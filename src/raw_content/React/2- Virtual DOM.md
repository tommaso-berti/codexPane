# 2. Virtual DOM


This slowness is made worse by the fact that **most JavaScript frameworks update the DOM much more than they have to.**
As an example, let’s say that you have a list that contains ten items. You check off the first item. Most JavaScript frameworks would rebuild *the entire list*. That’s ten times more work than necessary! Only one item changed, but the remaining nine get rebuilt exactly how they were before.
To address this problem, the people at React popularized something called the *virtual DOM.*

In React, for every <u>[DOM object](http://eloquentjavascript.net/13_dom.html)</u>, there is a corresponding “virtual DOM object.” A virtual DOM object is a *representation* of a DOM object, like a lightweight copy.
Manipulating the DOM is slow. Manipulating the virtual DOM is much faster because nothing gets drawn onscreen. Think of manipulating the virtual DOM as editing a blueprint, as opposed to moving rooms in an actual house.

## **How it works**
When you render a JSX element, every single virtual DOM object gets updated. This sounds incredibly inefficient, but the cost is insignificant because the virtual DOM can update so quickly.
Once the virtual DOM has been updated, then React compares the virtual DOM with a virtual DOM *snapshot* that was taken right before the update.
By comparing the new virtual DOM with a pre-update version, React figures out *exactly which virtual DOM objects have changed.* This process is called “diffing.”
Once React knows which virtual DOM objects have changed, then React updates those objects, *and only those objects,* on the real DOM. In our example from earlier, React would be smart enough to rebuild your one checked-off list-item and leave the rest of your list alone.
In summary, here’s what happens when you try to update the DOM in React:
* The entire virtual DOM gets updated.
* The virtual DOM gets compared to what it looked like before you updated it. React figures out which objects have changed.
* The changed objects, and the changed objects only, get updated on the *real* DOM.
* Changes on the real DOM cause the screen to change.

































