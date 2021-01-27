import OwnReact from "../src";

const Input = ({ handler }) => (
  <input onInput={evt => handler(evt.target.value)} type="text" />
);

export default Input;
