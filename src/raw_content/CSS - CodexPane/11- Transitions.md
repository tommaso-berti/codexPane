# 11. Transitions


CSS transitions allow us to control the timing of visual state changes. We can control the following four aspects of an element’s transition:
* Which CSS properties transition
* How long a transition lasts
* How much time there is before a transition begins
* How a transition accelerates

## Duration
To create a simple transition in CSS, we must specify two of the four aspects:
* The property that we want to transition.
* The duration of the transition.

```
a {
  background-color: green;
  font-size: 22px;
  transition-property: background-color, font-size;
  transition-duration: 1s;
}

a:hover {
    background-color: red;
    font-size: 32px
}

```

In this example the background color start with green and font size 22px. After the hover, the color and the font size changes to red and 32px in 1s.
For a complete list of all animated properties, see <u>[this resource](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)</u>.
Duration is specified in seconds or milliseconds, such as 3s, 0.75s, 500ms. The default value is 0s, or instantaneous, as if there is no transition.

## Timing function
The timing function describes the pace of the transition.
The default value is ease, which starts the transition slowly, speeds up in the middle, and slows down again at the end.
Other valid values include:
* ease-in — starts slow, accelerates quickly, stops abruptly
* ease-out — begins abruptly, slows down, and ends slowly
* ease-in-out — starts slow, gets fast in the middle, and ends slowly
* linear — constant speed throughout

```
transition-property: color;
transition-duration: 1s;
transition-timing-function: ease-out;

```

In the example above, the text color will be animated over one second. The timing function is ease-out which means it will begin abruptly and slow down as it ends.
Full list of the possible values, we recommend <u>[this resource](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)</u> from the Mozilla Developer Network.

## Delay
Much like duration, its value is an amount of time. Delay specifies the time to wait before starting the transition. The default value for transition-delay is 0s, which means no delay.

```
transition-property: color;
transition-duration: 1s;
transition-timing-function: ease-out;
transition-delay: 400ms.

```


## Transition

```
transition: color 1.5s linear 0.5s;

```

Leaving out one of the properties causes the default value for that property to be applied. There is one exception: You must set duration if you want to define delay. Since both are time values, the browser will always interpret the first time value it sees as duration.

## Combination

```
transition: color 1s linear, font-size 750ms ease-in 100ms;

```


## All
Even with the shorthand, specifying transitions for many properties can be tedious. It is common to use the same duration, timing function, and delay for multiple properties. When this is the case you can set the transition-property value to **all**. This will apply the same values to all properties. To effect this, you can use **all** as a value for transition-property.

```
transition: all 1.5s linear 0.5s;

```

