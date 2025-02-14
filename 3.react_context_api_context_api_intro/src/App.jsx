/*

Context API Intro
The Context API in React is a powerful feature designed to manage and share state 
across a component tree 
without having to pass props manually at every level. 
This is particularly useful in complex applications where props 
need to be accessed by deeply nested components.
Let's explore this concept using the provided example.

In the example, two approaches to state management are compared: 
the traditional prop drilling method and the Context API method.

Prop Drilling Method: 
Here, the NoContextParent component receives a user object as a prop. 
This prop is then passed down to NoContextChild, 
and subsequently to NoContextGranChild. 
This approach, known as prop drilling, requires each intermediary 
component to explicitly pass the prop down to the next level, 
which can become cumbersome and error-prone in larger applications.

Context API Method: In contrast, the Context API simplifies this process. 
A UserContext is created using createContext(), 
and a UserContext.
Provider wraps the component tree that needs access to the context value. 
The user object is provided as a value to the Provider. 
Any component within this tree, such as ContextGranChild, 
can then access the user object directly using the useContext(UserContext) hook, 
eliminating the need for prop drilling.

In summary, 
the Context API allows for cleaner and more efficient state management by avoiding prop drilling,
making it an essential tool for managing global state in React applications.

*/

/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import "./index.css";
import ContextParent from "./components/ContextParent";
import NoContextParent from "./components/NoContextParent";

// Create a Context for the user object
export const UserContext = createContext();
const App = () => {
  const user = { name: "Onur Erdogan", age: 95 };
  const thing2 = "I'm here too!";

  return (
    <>
      {/* In the no-context tree we need to pass the user as prop from NoContextParent
        all the way to the NoContextGrandchild */}
      <NoContextParent user={user} />
      <br />
      {/* For the context tree we use the Context Provider object, which is a component,
      define a value. This value is then accessible via the usage of the useContext hook directly in ContextGranChild */}
      <UserContext.Provider value={{ user, thing2 }}>
        <ContextParent />
      </UserContext.Provider>
    </>
  );
};

export default App;
