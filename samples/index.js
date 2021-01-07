import OwnReact from "../src";
import List from "./List";
import shuffleAlphabet from "../src/utils";

const root = document.getElementById(`root`);

// eslint-disable-next-line react/no-deprecated
OwnReact.render(List(shuffleAlphabet()), root);

setInterval(() => {
  // eslint-disable-next-line react/no-deprecated
  OwnReact.render(List(shuffleAlphabet()), root);
}, 5000);
