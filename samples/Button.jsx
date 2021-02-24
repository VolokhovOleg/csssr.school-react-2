import OwnReact from "../src";

const Button = ({ handler }) => (
  <button onClick={() => handler()} type="button">
    Перемешать
  </button>
);

export default Button;
