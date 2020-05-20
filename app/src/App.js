import React from 'react';
import './App.css';
import 'react-dropdown/style.css';
import BlockChain from './blockchain'
import Vote from './vote'

var vo = new BlockChain();

const votes = [0, 0, 0, 0, 0]

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '000' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    alert('Your selected candidate is: ' + this.state.value);
    vo.castVote(new Vote({ 'elect': this.state.value.toString(), 'vote': 1 }));
    votes[parseInt(this.state.value.toString(), 10) - 1]++;
    console.log(votes[parseInt(this.state.value.toString(), 10) - 1]);
    vo.countVotesOf(this.state.value.toString());
    event.preventDefault();
  }

  render() {
    const mystyle = {
      margin: 300,
      marginTop: 100,
      color: "White",
      fontWeight: 'bolder',
      fontSize: 30,
      padding: "10px",
      fontFamily: "Arial"
    };
    return (
      <form style={mystyle} onSubmit={this.handleSubmit}>
        <label >
          Pick your Neta  :
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="001">Candidate 1</option>
            <option value="002">Candidate 2</option>
            <option value="003">Candidate 3</option>
            <option value="004">Candidate 4</option>
            <option value="005">Candidate 5</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;