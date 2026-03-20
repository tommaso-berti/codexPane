# 13. React methods


## **React.memo**
**React.memo** is a useful practice when you want to avoid unnecessary re-renders of a component that receives props, such as in the case of **TileList**.
This improves performance, especially if the component is complex or the list is large, because the render only happens when the **contactList** prop changes.
It’s a best practice in React to optimize the application.

```
// In src/components/tileList/TileList.js
import React from "react";
export const TileList = React.memo(({ contactList }) => {
  // ...rest of the code
});

```

