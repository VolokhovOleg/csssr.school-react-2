import OwnReact from "../src";
import ListItem from "./ListItem";

const List = alphabet => <div>{alphabet.map(ListItem)}</div>;

export default List;
