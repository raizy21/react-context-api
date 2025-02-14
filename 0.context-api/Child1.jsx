import { useOutletContext } from "react-router-dom";

const Child1 = () => {
  const { counter } = useOutletContext();
  return `Current value: ${counter}`;
};
