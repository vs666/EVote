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
];
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
};

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
};

const PetitionList = []


function object() {
  return new BlockChain();
}
PetitionList.push(["Petition Name", "Type your petition", object()]);

function min(a, b) {
  return parseInt(a) < parseInt(b) ? a : b;
}

function tabMap() {
  const mystyleAll = {
    margin: 300,
    marginTop: 100,
    fontWeight: 'bolder',
    padding: "20px",
  };
  const mystyleHead = {
    color: "White",
    fontWeight: 'bolder',
    fontSize: 30,
    padding: "20px",
    fontFamily: "Arial"
  };
  const mystyleRest = {
    color: "White",
    fontWeight: 'bolder',
    fontSize: 15,
    padding: "20px",
    fontFamily: "Arial"
  };
  const ss = {
    padding: "20px"
  }
  return (
    <table style={mystyleAll}>
      <thead style={mystyleHead}>
        <td>Name</td>
        <td>Content</td>
        <td>Votes</td>
      </thead>
      <tbody style={mystyleRest}>
        {PetitionList.map(Petition => <tr><td style={ss}>{Petition[0]}</td><td style={ss}>{Petition[1].substring(0, min(Petition[1].length, 15))}</td><td style={ss}>{Petition[2].getSize() - 1}</td></tr>)}
      </tbody>
    </table>
  );
}


const vo = new BlockChain();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pet: 'Petition Name',
      value: '000',
      text: "Paste your petition",
      name: "Petition Name"
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handlePetitionChange = this.handlePetitionChange.bind(this);
    this.handlePetitionSubmit = this.handlePetitionSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
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
        var password = prompt("Please enter your password", "PASSWORD");
        if (pswd[person] != password.toString()) {
          alert("Wrong Password");
        }
        else {
          userDone[person] = true;
        }
      }
    } if (val == 1) {
      alert('Your selected candidate is: ' + this.state.value);
      vo.castVote(new Vote({ 'elect': this.state.value.toString(), 'vote': val }));
      vo.countVotesOf(this.state.value.toString());
    }
    event.preventDefault();
    this.setState({ value: '000' })
  }

  handlePetitionChange(event) {
    this.setState({ text: event.target.value });
  }

  // bug in handlePetitionChange


  handlePetitionSubmit(event) {
    var person = prompt("Please enter your name", "USERNAME");

    if (person == null || person == "") {
      return;
    }
    else {
      if (userDone[person] == null) {
        alert("incorrect username")
      }
      else {
        var password = prompt("Please enter your password", "PASSWORD");
        if (pswd[person] != password.toString()) {
          alert("Wrong Password");
        }
        else {
          var title = prompt("Please enter your petition title");
          PetitionList.push([title, this.state.text.toString(), object()]);
          PetitionList[PetitionList.length - 1][2].castVote({ 'elect': title.toString(), 'vote': 0 });
          console.log("Added petition", title.toString(), this.state.text.toString());
        }
      }
    }
    this.setState({ text: "Paste your petition" })
    event.preventDefault();
  }


  handleFormChange(event) {
    this.setState({ pet: event.target.value });
  }

  handleFormSubmit(event) {
    var person = prompt("Please enter your name", "USERNAME");

    if (person == null || person == "") {
      return;
    }
    else {
      if (userDone[person] == null) {
        alert("incorrect username")
      }
      else {
        var password = prompt("Please enter your password", "PASSWORD");
        if (pswd[person] != password.toString()) {
          alert("Wrong Password");
        }
        else {

          for (let x = 0; x < PetitionList.length; x++) {
            if (PetitionList[x][0] == this.state.pet) {
              PetitionList[x][2].castVote({ 'elect': PetitionList[x][0], 'vote': 0 });
              console.log("Added vote");
            }
          }
        }
      }
    }
    this.setState({ pet : "Petition Name" })
    event.preventDefault();
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
        <form style={mystyle} onSubmit={this.handlePetitionSubmit}>
          <label>
            Enter Issue  :> <br></br>
            <textarea value={this.state.text} onChange={this.handlePetitionChange} rows="20" cols="120" />        </label>
          <br></br><input type="submit" value="Submit" />
        </form>
      );
    }

    const upvote = () => {
      return (
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.pet} onChange={this.handleFormChange} />        </label>
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
        <div>
          <Router>
            <Route path="/petition" component={tabMap} />
          </Router>
        </div>

        <div>
          <Router>
            <Route path="/petition" component={upvote} />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;