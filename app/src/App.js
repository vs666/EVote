import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, NavLink } from 'reactstrap';

import {
  BrowserRouter as Router,
  Route,
  withRouter,
  useHistory,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import './App.css';
import 'react-dropdown/style.css';
import BlockChain from './blockchain'
import Vote from './vote'

const userStatus = [
  { 'username': 'A', 'done': false, 'login': false },
  { 'username': 'B', 'done': false, 'login': false },
  { 'username': 'C', 'done': false, 'login': false },
  { 'username': 'D', 'done': false, 'login': false },
  { 'username': 'E', 'done': false, 'login': false },
  { 'username': 'F', 'done': false, 'login': false },
  { 'username': 'G', 'done': false, 'login': false },
  { 'username': 'H', 'done': false, 'login': false },
  { 'username': 'I', 'done': false, 'login': false }
]

const userDone = {
  'A': false,
  'B': false,
  'C': false,
  'D': false,
  'E': false,
  'F': false,
  'G': false,
  'H': false,
  'I': false,
}

const pswd = {
  'A': "a",
  'B': "b",
  'C': "c",
  'D': "d",
  'E': "e",
  'F': "f",
  'G': "g",
  'H': "h",
  'I': "i",
}

const Petition=[
  ["Petition Name","Type your petition"]
]

const signed = {
  'Petition' : []
}

const vo = new BlockChain();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '000',
    default : "Type your petition",
    name : "Petition Name"
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, callback) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    var person = prompt("Please enter your name", "USERNAME");
    var val = 1;
    console.log(userDone['A']);
    console.log(userDone[person]);
    if (person == null || person == "") {
      return;
    } else {
      if (userDone[person] == true || userDone[person] == null) {
        alert("incorrect username or already voted, " + person)
        val = 0;
      }
      else {
        userDone[person] = true;
      }
    } if (val == 1) {
      alert('Your selected candidate is: ' + this.state.value);
      vo.castVote(new Vote({ 'elect': this.state.value.toString(), 'vote': val }));
      vo.countVotesOf(this.state.value.toString());
    }
    event.preventDefault();
    this.setState({ value: '000' })
  }


  render() {

    const refresh = () => {
      window.location.reload(false);
    };

    const votePage = () => {
      return (
        <div>

          <form style={mystyle} onSubmit={this.handleSubmit}>
            <label >
              Pick your Neta  :
            <br></br>
            Candidate 1 : {vo.countVotesOf("1")} votes
            <br></br>
            Candidate 2 : {vo.countVotesOf("2")} votes
            <br></br>
            Candidate 3 : {vo.countVotesOf("3")} votes
            <br></br>
            Candidate 4 : {vo.countVotesOf("4")} votes
            <br></br>
            Candidate 5 : {vo.countVotesOf("5")} votes
            <br></br>
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="0">NULL</option>
                <option value="1">Candidate 1</option>
                <option value="2">Candidate 2</option>
                <option value="3">Candidate 3</option>
                <option value="4">Candidate 4</option>
                <option value="5">Candidate 5</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
    const showWinner = () => {
      let index = 0;
      for (let x = 1; x <= 5; x++) {
        if (parseInt(vo.countVotesOf(x)) > parseInt(vo.countVotesOf(index))) {
          index = x;
        }
        console.log(vo.countVotesOf(toString(x)));
      }
      // let can = "" + index;
      return (
        <div>
          Candidate {index} Won the elections
        </div>
      );
    }
    const petition = () => {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter Issue:
          <textarea value={this.state.default} onChange={this.handleChange} />        </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }

    const login = () => {
      return (
        <div>

        </div>
      );
    }
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
      <div>

        {/* <div>
          <Router>
            <Route path="/result" component={showWinner} />
          </Router>
        </div> */}

        <div>
          <Router>
            <Route path="/vote" component={votePage} />
          </Router>
        </div>

        <div>
          <Router>
            <Route path="/petition" component={petition} />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;