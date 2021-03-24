import OwnReact from "../src";
import Component from "../src/Component";
import { shuffleAlphabet, shuffleByUser } from "../src/utils";
import List from "./List";
import ListItem from "./ListItem";
import Button from "./Button";
import Input from "./Input";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alphabet: shuffleAlphabet()
    };
  }

  onChangeHandler(string) {
    const alphabet = shuffleByUser(string);
    this.setState({ alphabet });
  }

  shuffle() {
    const alphabet = shuffleAlphabet();
    this.setState({ alphabet });
  }

  render() {
    const { alphabet } = this.state;

    return (
      <List>
        {alphabet.map(item => (
          <ListItem letter={item} />
        ))}
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Input handler={this.onChangeHandler.bind(this)} />
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Button handler={this.shuffle.bind(this)} />
      </List>
    );
  }
}

export default App;
