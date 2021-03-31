import OwnReact from "../src";
import PureComponent from "../src/PureComponent";

class ListItem extends PureComponent {
  render() {
    const { letter } = this.props;
    return <div>{letter}</div>;
  }
}

export default ListItem;
