# 11. Routing


Routing is the process by which a web application uses the current browser URL (**U**niform **R**esource **L**ocator) to determine what content to show a user.
Before we dive into the lesson, let’s briefly go over the basic structure of URLs. Consider this URL:
![2B91C0BC-3E1F-45BB-9702-2BF39C70A829](images/2B91C0BC-3E1F-45BB-9702-2BF39C70A829.png)
* The domain (eg. codecademy.com), which specifies the website that hosts the resource. The domain serves as the entry point for your application.
* The path (eg. /articles), which identifies the specific resource or page to be loaded and displayed to the user. This is where routing begins!
* The optional query string (eg. ?search=node), which appears after a ‘?’ and assigns values to parameters. Common uses of query strings include search parameters and filters.
A popular back-end solution is to use the <u>[Express](https://www.codecademy.com/learn/learn-express)</u> routing framework. In this lesson, we will cover <u>[React Router](https://reactrouter.com/en/main/)</u>, a popular front-end routing solution designed specifically for React applications.

## **Installation**
**[https://reactrouter.com/](https://reactrouter.com/)**
In order to use React Router, you will need to include the <u>[react-router-dom package](https://www.npmjs.com/package/react-router-dom)</u> (the version of React Router built specifically for web browsers) in your project by using npm like so:

```
npm install --save react-router-dom@6

```

React Router provides multiple routers, however, the most common one is createBrowserRouter. The other options, and the reasons you might choose one over the other, are outside the scope of this lesson. If you are interested, you can read more about alternative routing options <u>[here](https://reactrouter.com/en/main/routers/picking-a-router)</u>.
To add a router to our project, we can import it at the top of our file, like so:

```
import { createBrowserRouter } from 'react-router-dom';
```


```


```

Next, we’ll initialize our router by calling createBrowserRouter. This method accepts a list of JSX components

```
const router = createBrowserRouter( /* application routes are defined here */ );
```


```


```

The router serves as the basis for all the React Router logic. Without it, we’d get errors if we tried using React Router components or methods. 

## **Provide a router**
In the React Router paradigm, the different views of your application, also called *routes* are just React components. To include them in your application, you will need to render them.
The first step is to make our router available to our entire application by using React Router’s RouterProvider.

```
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const router = createBrowserRouter( /* application routes are defined here */ );

export default function App () {
  return (
    <RouterProvider router={ router } />
  );
}
```


```


```

createBrowserRouter will define a router that prevents URL changes from causing the page to reload. Instead, URL changes will allow the router to determine which of its defined routes to render while passing along information about the current URL’s path as props. We make our router available application-wide by providing it using RouterProviderat the root of our application.

## **Basic Routing with <Route>**
With our router in place, we can begin defining the different views, or *routes*, that our application will render for various URL paths. For example, we might want to render an About component for the /about path and a SignUp component for the /sign-up path. React Router gives us two options to define routes: JSX or objects.
**The .createBrowserRouter method accepts an array of <Route> objects, so we’ll need to use React Router’s .createRoutesFromElements method to configure our routes with JSX.** We also need to use React Router’s <Route> component to define our routes. These components can be imported from the react-router-dom package, alongside the .createBrowserRouter method, like so:

```
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from `react-router-dom`

```

The <Route> component is designed to render (or not render) a component based on the current URL path. Each <Route> component should include:
* A path prop indicating the *exact* URL path that will cause the route to render.
* An element prop describing the component to be rendered.
For example, we can use .createRoutesFromElements to configure a <Route> that renders the <About> component when the URL path matches '/about':

```
import About from './About.js';
import { RouterProvider, createBrowserRouter, Route } from 'react-router-dom';
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/about' element={ <About/> } />
));

export default function App () {
  return (
    <RouterProvider router={ router } />
  );
}

```

In many cases, there may be certain components, like sidebars, navigation bars, and footers, that we want to render with every page view. We can achieve this by defining a root-level component that contains layout elements we want to render consistently. 

```
// App.js
/* imports ... */

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root/> }>
    // nested routes here will render along with the <Root/> component

```


```
    <Route path='/about' element={ <About/> } />
    <Route path='/sign-up' element={ <SignUp/> } />
    ...

```


```
  </Route>
));

```

With this route configuration, whenever a user navigates to one of the nested routes, that view will render, along with any elements we’ve defined in our <Root/> component.

```
// Root.js

```


```
export default function Root() {
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

```


## **Linking to Routes (Link, NavLink)**
When building a website using HTML, we use the anchor (<a>) tag to create links to other pages. A side effect of the anchor tag is that it causes the page to reload. This can distract our users from the immersive experience of our smooth React application!
React Router offers two solutions for this: the <u>[Link](https://reactrouter.com/en/main/components/link)</u> and <u>[NavLink](https://reactrouter.com/en/main/components/nav-link)</u> components, both of which can be imported from the react-router-dom package.

```
import { createBrowserRouter, createRoutesFromElement, Route, Link, NavLink } from 'react-router-dom';

```

Both Link and NavLink components work much like anchor tags:
* They have a to prop that indicates the location to redirect the user to, similar to the anchor tag’s href attribute.
* They wrap some HTML to use as the display for the link.

```
<Link to="/about">About</Link>
<NavLink to="/about">About</NavLink>

```

Both of the above links will generate anchor (<a>) tags with the text “About”, which take the user to the /about view when clicked. However, the default behavior of an anchor tag – refreshing when the page loads – will be disabled. Note that if we preface the path provided to our to prop with a forward slash, /, as we did in the example above, this path will be treated as an **absolute** path. That is, React Router will assume this path is navigating from the root directory. We’ll talk more about how to define paths that are **relative** to our current directory in upcoming exercises.
When the URL path matches a NavLink component’s to prop, the link will automatically have an 'active' class applied to it. This can be quite useful for building navigation menus, as we can define CSS styles for the .active class name to differentiate between active and inactive links, enabling users to quickly see which content they are viewing.

```
<NavLink 
  to="about" 
  className={ ({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'}
  > About </NavLink>

```

In the example above we pass a function to the className prop which applies the activeNavLink class if the NavLink is active and inactiveNavLink otherwise.

## **Dynamic Routes**
So far, all the routes we’ve covered have been static, which means they match a single unique path. This works for predetermined routes that render a consistent view. But what if we need to build a route that is more flexible? For example, imagine a tech news site where each article is accessible from the path '/articles/' + some-title where some-title is unique for each article. It would be much more convenient to define a single route that can match any path with the pattern '/articles/' + someTitle and know exactly which component to render. 
React Router allows us to do this by using **URL parameters** to create **dynamic routes**.

URL parameters are dynamic segments of a URL that act as placeholders for more specific resources. They appear in a dynamic route as a colon (:) followed by a variable name, like so:

```
const route = createBrowserRouter(createRoutesFromElement(
  <Route path='/articles/:title' element={ <Article /> }/>
))

```

* In this example, the path prop 'articles/:title' contains the URL parameter :title.
* This means that when the user navigates to pages such as '/articles/what-is-react' or '/articles/html-and-css', the <Article /> component will render.
* When the Article component is rendered in this way, it can access the actual value of that :title URL parameter (what-is-react or html-and-css) to determine which article to display (more on this in the next exercise). A single route can even have multiple parameters (eg. 'articles/:title/comments/:commentId') or none (eg. 'articles').

## **useParams**
It is common to use the value of URL parameters to determine what is displayed in the component that a dynamic route renders. For example, the Article component might need to display the title of the current article.
React Router provides a hook, useParams(), for accessing the value of URL parameters. When called, useParams() returns an object that maps the names of URL Parameters to their values in the current URL.
For example, consider the Articles component below which is rendered by a route with the dynamic URL '/articles/:title'. Consider the following Article component, that will render when a user visits /articles/objects:

```
import { Link, useParams } from 'react-router-dom';

export default function Article() {
  
  let { title } = useParams();
  // title will be equal to the string 'objects'

  // The title will be rendered in the <h1>
  return (
    <article>
      <h1>{title}</h1>
    </article>
  );
}

```

* First, the useParams() hook is imported from react-router-dom.
* Then, inside the Article component, useParams() is called which returns an object.
* <u>[Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)</u> is then used to extract the value of the URL parameter from that object, storing it in a variable named title.
* Finally, this title value is used to display the name of the article in the <h1> element.

## **Nested Routes**
As our application grows and we add more features, we may want additional components to render within our defined views depending on user actions.
For example, suppose that we have an About page that will be rendered if we hit the path /about. We’d like to implement a new feature that will display a secret message in About if the path changes to /about/secret. We might try and do this:

```
const router = createBrowserRouter(createRoutesFromElement([
  <Route path='/about' element={ <About/> } />,
  <Route path='/about/secret' element={ <Secret/> } />
]));

```

Since React Router matches paths *exactly*, if we go to the path /about/secret, it will only render Secret and not About. We’d like to render About when we hit /about and *also* render Secret below About when we hit /about/secret. We can do this using **nested routes**.
A nested route, as the name suggests, is a Route within a Route. A Route containing one or more Routes nested within it is known as the **parent** route, and a Route that is contained within another Route is known as the **child** route. When nesting Routes, the child Route path is *relative* to the parent Route‘s path so we shouldn’t include the parent path in its path prop.

```
/* imports ... */
const router = createBrowserRouter(createRoutesFromElement(
  <Route path='/about' element={ <About/> }> {/* About renders if path starts with /about */}
    <Route path='secret' element={ <Secret/> } />  {/* we can exclude /about from this path since it is relative to its parent */}
  </Route> 
));

```

Using this nested route, the About component will render when the path starts with /about. If the path matches /about/secret, the Secret component will render in addition to the About component. Remember that a Route can be both a parent and child route if it is nested within a route and contains nested routes within it. The same parent/child properties would apply.

### <Outlet />
Our router is configured to render our nested route, but if we ran this code, we still wouldn’t see Secret rendered below About. That’s because we haven’t told About *where* to render its child route element. To do this, we need to make use of the React Router Outlet component in the parent About component, like so:

```
import { Outlet } from 'react-router-dom';

// Rendered when the user visits '/about'
export default function About() {
  return (
    <main>
       <h1>Lorem ipsum dolor sit amet.</h1>
       <Outlet/>  {/* renders child element when user visits /about/secret */}
    </main>   
  );
}

```

Now, when we visit /about/secret, our router will render About and its child route component, Secret, wherever the Outlet component is defined in the parent. You can think of it as the router replacing Outlet with our defined child route.

### index
When using nested routes, we can also make use of **index** routes. An index route is a Route that uses the index prop instead of a path prop and is special because it renders on its parent’s path. For example:

```
/* imports ... */
const router = createBrowserRouter(createRoutesFromElement(
  <Route path='/about' element={ <About/> }> {/* About renders if path starts with /about */}
    <Route index element={ <IndexComponent/> } />  {/* Will render when the path is /about */}
    <Route path='secret' element={ <Secret/> } />  {/* Will render when the path is /about/secret */}
  </Route> 
));

```

We can think of an index route as a **default** Route that will render in its parent’s Outlet when the path matches the parent path exactly, so there’s some content in that space.
Nested routes give us fine-tuned control over what, when, and where certain elements appear within their parent Route. Let’s practice what we’ve learned by adding some nested routes to our application.

Example
An index route is a “default” child route for a given path.
With nested routes, you can write:

```
<Route path="/profile" element={<Profile />}>
  <Route index element={<ProfileHome />} />
  <Route path="edit" element={<EditProfileForm />} />
</Route>

```

The index route displays when the user visits exactly /profile. You don’t need to set a path for it. If you visit /profile, you’ll see Profile and, inside it, ProfileHome where <Outlet /> is placed. If you visit /profile/edit, you’ll see Profile and only EditProfileForm inside it.

## <Navigate>
Like a Link or NavLink, the Navigate component has a to prop. However, where Link and NavLink must be clicked to navigate the user, once the Navigate component is rendered, the user will automatically be taken to the location specified by the to prop:

```
import { Navigate } from 'react-router-dom';

const UserProfile = ({ loggedIn }) => {
  if (!loggedIn) {
    return (
      <Navigate to='/' />
    )
  }

  return (
    // ... user profile content here
  )  
}

```

In this example, when the UserProfile component renders, if the loggedIn prop is false, then the Navigate component will be returned and then rendered, sending the user to the / page. Otherwise, the component will render normally.

## useNavigate
Though the navigate approach follows React Router’s declarative coding style, it does introduce a few extra steps in the React rendering lifecycle:
* The Navigate component must be returned.
* The Navigate component is then rendered.
* The URL is updated.
* And finally the appropriate route is rendered.
React Router also provides a mechanism for updating the browser’s location imperatively using the useNavigate hook.
The useNavigate() function returns a navigate function that allows us to specify a path where we’d like to navigate.
Consider this example which immediately triggers a redirect back to the / page after a user successfully submits a <form>:

```
import { useNavigate } from `react-router-dom`;

export const ExampleForm = () => {

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault();
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form elements */ }
    </form>
  )
}

```

By enabling imperative updates to the browser location, the navigate function allows you to respond immediately to user input without having to wait.

### History
The useNavigate() function also gives us the ability to programmatically navigate our users through their <u>[history](https://developer.mozilla.org/en-US/docs/Web/API/Window/history)</u> stack. Scenarios like enabling users to go forward or backward in an application, or redirecting users to their previous page after they’ve logged in, are great use cases for this functionality. To navigate a user through their history stack using useNavigate(), we’d pass in an integer to indicate where in the history we’d like to travel. A positive integer navigates forward and a negative integer navigates backward.
* navigate(-1) - navigate to the previous URL in the history stack.
* navigate(1) - navigate to the next URL in the history stack.
* navigate(-3) - navigate 3 URLs back in the history stack.

## Query parameters (useSearchParams)
### useSearchParams
Query parameters appear in URLs beginning with a question mark (?) and are followed by a parameter name assigned to a value. They are optional and are most often used to search, sort and/or filter resources.

```
https://www.google.com/search?q=codecademy

```

You would be taken to Google’s /search page displaying results for the search term codecademy. In this example, the name of the query parameter is q.
Query parameters can be useful in determining which content to display to our user and React Router provides a mechanism for grabbing query parameter values with the useSearchParams() hook. This hook returns a <u>[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)</u> object and a function we can use to update it.

```
import { useSearchParams } from 'react-router-dom'

// Rendered when a user visits "/list?order=DESC"
export const SortedList = (numberList) => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const sortOrder = searchParams.get('order');

  if (sortOrder === 'ASC') {
    // render the numberList in ascending order
  } else if (sortOrder === 'DESC') {
    // render the numberList in descending order
  } else {
    // render the numberList as is
  }
}

```

* First, we import useSearchParams() and call it within SortedList to get the URLSearchParams object. This object has a .get() method for retrieving query parameter values.
* Finally, to get the value of a specific query parameter, we pass in the name of the query parameter whose value we want to obtain, as a string ('order'), to the queryParams.get() method. The value ('DESC') is then stored in the variable order.
Now, if the user were to visit /list?order=DESC, the value 'DESC' would be extracted and we can render the SortedList component in descending order. Likewise, visiting /list?order=ASC will render the list in ascending order. Finally, since query parameters are optional, if we were to visit /list, the SortedList component would render in its natural order.

Imagine we have a List component with a sort button that we wanted to use to update the URL to /list?order=ASC, then render SortedList. We can use the setSearchParams() function to do this. For example:

```
import { useSearchParams } from 'react-router-dom';

// Rendered when a user visits "/list"
export const List = (numberList) => {
  const [ searchParams, setSearchParams ] = useSearchParams();

  // render the numberList in ascending order
  <button click={ () => setSearchParams( {order: 'ASC'} ) }>
    Sort 
  </button>
}

```


### createSearchParams()
useSearchParams works great when we want to access the current path’s query parameters or alter them but what if we want to navigate to a path and include query parameters too? Well, for this scenario we’ll need to use the createSearchParams() utility function from react-router-dom with the useNavigate hook we learned about previously.
For example, if we wanted to directly navigate to /list?order=ASC from the root (/) path we’d do something like this:

```
import { useNavigate, createSearchParams } from 'react-router-dom';
// get navigate function
const navigate = useNavigate();

// define an object where the key is is the query parameter name and value is query parameter value
const searchQueryParams = {
  order: 'ASC'
}

// use createSearchParams which takes an object and transforms it to a query string of the form order=ASC
const searchQueryString = createSearchParams(searchQueryParams);

// force a navigate by passing in an object with pathname indicating that path to navigate and search indicating the query parameters to append
navigate({
  pathname:'/list',
  search: `?${searchQueryString}`
})

```

* Define an object representing the query parameters we want and call it searchQueryParams.
* Pass searchQueryParams to createSearchParams which will transform it from an object to a query string form.
* Call useNavigate and pass an object with pathname and search keys where pathname is a string indicating where to navigate to and search is a string indicating the query string to append to the path.



































