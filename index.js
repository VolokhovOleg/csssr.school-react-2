const { performance } = window;
let performanceData = null;
const startProfiler = (name) => {
  performance.mark(`${name} start`);
}
const endProfiler = (name) => {
  performance.mark(`${name} end`);
  const { duration } = performance.measure(
    `${name} measure`,
    `${name} start`,
    `${name} end`
  );
  console.info(`${name} time: `, duration);
}

class Card extends React.Component {

  state = {
    isActivated: false,
  }
  hardCalculations() {
    startProfiler(`hardCalculations`);
    for (let i = 0; i < 1000000; i++) {
      let j = Math.random();
    }
    endProfiler(`hardCalculations`);
  }
  render() {
    startProfiler(`Render Card component`);

    this.hardCalculations() // Крайне необходимые вычисления, не убирать!;
    const { isActivated } = this.state;
    if (this.props.activeIds.indexOf(this.props.id) > -1 && !isActivated) {
      this.setState({
        isActivated: true
      });
    } else if (this.state.isActivated && this.props.activeIds.indexOf(this.props.id) === -1) {
      this.setState({isActivated: false})
    }
    if (isActivated) {
      endProfiler(`Render Card component`);
      return (
        <div className="card card-front">{this.props.value}</div>
      )
    } else {
      endProfiler(`Render Card component`);
      return (
        <div onClick={this.props.onClick} className="card card-back"></div>)
    }
  }

}

class GameApp extends React.Component {
  state = {
    difficulty: 'Easy',
    activeCardId1: null,
    activeCardId2: null,
    cards: [],
    cursor: 'default',
  }

  componentDidMount() {
    const select = document.getElementById('difficulty-select');
    select.addEventListener('change', this.handleSelect);
  }
  fillCards = count => {
    startProfiler(`fillCards`);
    let cards = [];
    let valuesPool = [];
    for (let j = 1; j <= count; j++) {
      valuesPool.push(j);
      valuesPool.push(j);
    }
    for (let i = 0; i < count * 2; i++) {
      cards.push({value: valuesPool[i], id: i});
      this.setState({
        cards,
      })
    }

    endProfiler(`fillCards`);
  };
  handleSelect = (e) => {
    startProfiler(`handleSelect`);
    if (e.target.value === 'Easy') {
      this.fillCards(2);
    } else if (e.target.value === 'Hard') {
      this.fillCards(10);
    }
    this.setState({
      difficulty: e.target.value,
    });
    endProfiler(`handleSelect`);
  };
  createHandleClickCard = card => ev => {
    startProfiler(`createHandleClickCard`);
    if (this.state.activeCardId1 !== null) {
      this.setState({
        activeCardId2: card.id
      });
    } else {
      this.setState({
        activeCardId1: card.id
      });
    }
    endProfiler(`createHandleClickCard`);
  }
  render() {
    startProfiler(`GameApp`);
    const { cursor } = this.state;
    const activeIds = [this.state.activeCardId1, this.state.activeCardId2];
    if (this.state.activeCardId1 && this.state.cursor !== 'crosshair') {
      this.setState({
        cursor: 'crosshair',
      })
    }
    const cardsById = this.state.cards.reduce((acc, value) => {
      acc[value.id] = value;
      endProfiler(`GameApp`);
      return acc;
    }, {});
    if (this.state.activeCardId1 !== null && this.state.activeCardId2 !== null) {
      const cards = this.state.cards;
      const card1 = cardsById[this.state.activeCardId1];
      const card2 = cardsById[this.state.activeCardId2];
      if (card1.value === card2.value) {
        setTimeout(() => {
          cards.splice(cards.indexOf(card1), 1);
          cards.splice(cards.indexOf(card2), 1);
          this.setState({
            cards,
            activeCardId1: null,
            activeCardId2: null,
            cursor: 'default',
          });
        }, 150)

      } else {
        this.setState({
          activeCardId1: null,
          activeCardId2: null,
          cursor: 'default',
        });
      }
    }
    if (this.state.cards.length < 1) {
      console.log(this.state);
      if (this.state.difficulty === 'Easy') {
        this.fillCards(2);
      } else if (this.state.difficulty === 'Hard') {
        this.fillCards(10);
      }
    }
    endProfiler(`GameApp`);
    return (
      <div style={{cursor}}>
        <span>Difficulty</span>
        <select id="difficulty-select" style={{marginBottom: '4px'}}>
          <option>Easy</option>
          <option>Hard</option>
        </select>
        <div style={{display: 'flex'}}>
          {this.state.cards.map(card => <Card key={card.id} activeIds={activeIds} onClick={this.createHandleClickCard(card)} id={card.id} value={card.value} />)}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<GameApp />, root);
