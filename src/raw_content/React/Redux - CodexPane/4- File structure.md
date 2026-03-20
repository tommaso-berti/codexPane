# 4. File structure


Instead, it is more common, and better practice, to break up a Redux application using the <u>[Redux Ducks pattern](https://github.com/erikras/ducks-modular-redux)</u>, like so:

```
src/
|-- index.js
|-- app/
    |-- store.js
|-- features/
    |-- featureA/
        |-- featureASlice.js
    |-- featureB/
        |-- featureBSlice.js

```

* The entry point for the entire application, **index.js**The sub-directories **app/** and **features/**.
* The **src/app/** directory has only one file (for now), **store.js**. As before, the ultimate purpose of this file is to create the rootReducer and the Redux store.
* The **src/features/** directory, and its own **src/features/featureX/** sub-directories, contain all of the code relating to each individual slice of the store‘s state. For example, for the state.favoriteRecipes slice, its slice reducer and action creators can be found in the file called **src/features/favoriteRecipes/favoriteRecipesSlice.js**.

## More complex file structures
This structure includes React elements

```
src/
|-- index.js
|-- app/
    |-- App.js (+)
    |-- store.js
|-- components/
    |-- FavoriteButton.js (+)
    |-- Recipe.js (+)
|-- features/
    |-- allRecipes/
        |-- AllRecipes.js (+)
        |-- allRecipesSlice.js
    |-- favoriteRecipes/
        |-- FavoriteRecipes.js (+)
        |-- favoriteRecipesSlice.js
    |-- searchTerm/
        |-- SearchTerm.js (+)
        |-- searchTermSlice.js

```

* <App />: The top-level component for the entire application.
* <AllRecipes />: The component for rendering the recipes loaded from the “database”.
* <FavoriteRecipes />: The component for rendering the recipes favorited by the user.
* <SearchTerm />: The component for rendering the search bar that filters the visible recipes.
* <Recipe /> and <FavoriteButton />: Generic components used by <AllRecipes /> and <FavoriteRecipes />
Aside from the generic components, each feature-related React component file is located in the same directory as the slice file that manages the data rendered by that component. For example, **FavoriteRecipes.js** and **favoriteRecipesSlice.js** are both in the **src/features/favoriteRecipes/** directory.
Open the **src/app/App.js** file where the top-level component, <App />, is stored. As in most React applications, this top-level component will render each feature-component and pass any data needed by those components as prop values. In Redux applications, the data passed to each feature-component includes:
* The slice of the store‘s state to be rendered. For example, the state.searchTerm slice is passed to the <SearchTerm /> component.
* The store.dispatch <u>[method](https://www.codecademy.com/resources/docs/general/method)</u> to trigger state changes through user interactions within the component. For example, the <SearchTerm /> component will need to dispatch setSearchTerm() actions.
This distribution of the store.dispatch method and the slices of state to all of the feature-components, via the <App /> component, begins in the **index.js** file. Open up the **src/index.js** file where you will see some standard React code for rendering the top-level <App /> component. You’ll notice that the store is missing, and the <App /> component isn’t receiving any props!
