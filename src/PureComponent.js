import { shallowEqual } from "./utils";
import Component from "./Component";

class PureComponent extends Component {
  shouldComponentUpdate(nextProps) {
    if (shallowEqual(this.props, nextProps)) {
      return false;
    }
    return true;
  }
}

export default PureComponent;
