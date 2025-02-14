const ParentComponent = ({ user }) => {
  return <ChildComponent user={user} />;
};

const ChildComponent = ({ user }) => {
  return <GrandChildComponent user={user} />;
};

const GrandChildComponent = ({ user }) => {
  return <div>{user.name}</div>;
};

// Without Context: Prop Drilling Example
const App = () => {
  const user = { name: "John Doe", age: 30 };
  return <ParentComponent user={user} />;
};
