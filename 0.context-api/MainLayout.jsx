import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <ul>
        <li>
          <Link to="/">Child1</Link>
        </li>
        <li>
          <Link to="/child2">Child2</Link>
        </li>
      </ul>
      <div>
        <Outlet context={{ counter, setCounter }} />
      </div>
    </>
  );
};
