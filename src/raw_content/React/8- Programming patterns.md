# 8. Programming patterns


## Separate container components 
Separating container components from presentational components is a popular React programming pattern.
The functional part of a component (maintaining a state, making calculations based on props, etc.) can be separated into a container component, also known as a stateful component.
This container component will be in charge of maintaining the state (creating and updating) and passing it on (we’ll see this later) to any component it renders through props.

## **Create Presentational Component**
The presentational component’s only job is to contain JSX. It should be an exported component and should not render itself because a presentational component will always get rendered by a container component.
For example, say we have components called Presentational and Container. **Presentational.js** must export the component function (or class, when applicable):

```
function Presentational(/*...props*/) {
  // body of the component						
}
                        
export default Presentational;

```

**Container.js** must import that component:

```
import { Presentational } from 'Presentational.js';
function Container() {
  // renders Presentational component
}

```

It’s important to understand that although a presentational component doesn’t maintain state, it doesn’t mean it is not reactive. Recall that, like state, a change in props also triggers a potential change in the rendered JSX.

### **Parent/Child and Sibling/Sibling Communication**
In order for a presentation (stateless) component to communicate changes to a container (stateful) component, the container component must define and provide a way for the presentational component to communicate with it using a change handler function passed as a prop.

```
function Container() {
  const [isActive, setIsActive] = useState(false);								
                                
  return (
    <>
      <Presentational active={isActive} toggle={setIsActive}/>
      <OtherPresentational active={isActive}/>
    </>
    );							
  }
                        
function Presentational(props) {
  return (
    <h1>Engines are {props.active}</h1>
    <button onClick={() => props.toggle(!props.active)}>Engine Toggle</button>
  );
}
                            
function OtherPresentational(props) {
  // render...
}

```

In the example above, Container maintains the isActive state and passes setIsActive to Presentational through the toggle prop. When Presentational needs to communicate a change to the active prop, it uses the function passed to it through the toggle prop.
Using this pattern also indirectly results in communication between sibling components (components with a common parent), as shown in the example above. When Presentational communicates a change through toggle, it causes a state update in Container, which provides the updated value for isActive to both Presentational and OtherPresentational through the active prop.

### **Render Presentational Components in Container Component**
The container component should now render the presentational components instead of rendering JSX. The container component’s state will be passed down as props to the presentation components to keep them reactive.










































