# 11a. Animations tips


## Slide-down and fade-in effect
General CSS rule:

```
.element {
  position: fixed; /* or absolute, depending on your layout */
  top: -100%; /* Start position above the visible area */
  opacity: 0; /* Start fully transparent */
  transition: top 0.5s ease-out, opacity 0.3s linear; /* Transition properties */

.element:hover {
  top: 0; /* Move into view */
  opacity: 1; /* Fully visible */
}

```

This rule makes the element slide down from above and fade in when hovered over.
