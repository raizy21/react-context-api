import { useOutletContext } from "react-router-dom";

const Child2 = () => {
  const { setCounter } = useOutletContext();
  return (
    <button onClick={() => setCounter((prev) => prev + 1)}>
      Click to increase counter and then go back to Child1
    </button>
  );
};
