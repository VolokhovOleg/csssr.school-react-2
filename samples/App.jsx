import OwnReact from "../src";
import Component from "../src/Component";
import shuffleAlphabet from "../src/utils";
import List from "./List";
import ListItem from "./ListItem";

const TICK_TIME_OUT = 5000;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alphabet: shuffleAlphabet()
    };
  }

  tick() {
    const alphabet = shuffleAlphabet();
    this.setState({ alphabet });
  }

  render() {
    const { alphabet } = this.state;

    setTimeout(() => {
      this.tick();
    }, TICK_TIME_OUT);

    return (
      <List>
        {alphabet.map(item => (
          <ListItem>{item}</ListItem>
        ))}
      </List>
    );
  }
}

export default App;
