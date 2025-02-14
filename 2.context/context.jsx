import React, { createContext, useContext } from "react";

const ParentComponent = () => {
  return <ChildComponent />;
};

const ChildComponent = () => {
  return <GrandChildComponent />;
};

const GrandChildComponent = () => {
  // Use the useContext hook to access the user object
  const user = useContext(UserContext);
  return <div>{user.name}</div>;
};



// Create a Context for the user object
const UserContext = createContext();

const App = () => {
  const user = { name: "John Doe", age: 30 };

  return (
    <UserContext.Provider value={user}>
      <ParentComponent />
    </UserContext.Provider>
  );
};

export default App;
