import { RouterProvider } from "react-router-dom";

// One of the key advantages of the Context API is its ability to avoid prop drilling,
// which occurs when you pass data through many layers of components unnecessarily.
// By using Context, you can keep your code cleaner, easier to read, and more maintainable.
const App = () => <RouterProvider router={router} />;

export default App;
