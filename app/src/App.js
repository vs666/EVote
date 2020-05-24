import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, NavLink } from 'reactstrap';
import EssayForm from './TextAr'
import InputForm from './Input'
import Table from './TabMap'
import { userDone, pswd, userStatus, PetitionList } from './DataSet'
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  useHistory,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import ReactDOM from 'react-dom'
import './App.css';
import 'react-dropdown/style.css';
import BlockChain from './blockchain'
import Vote from './vote'

function object() {
  return new BlockChain();
}
export { object }
PetitionList.push(["Cross Entry", "This petition suggests a gender neutral approach to collaboration and lifestyle of college peer. Thus we believe that cross entry should be allowed in the college.", object()]);

function min(a, b) {
  return parseInt(a) < parseInt(b) ? a : b;
}

function tabMap() {
  return <Table />;
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
    this.setState({ pet: "Petition Name" })
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
              FC Elections  :
            <br></br>
            Srinath Nair: {vo.countVotesOf("1")} votes
            <br></br>
            Bhavyajeet Singh: {vo.countVotesOf("2")} votes
            <br></br>
            Shivaan Sehgal: {vo.countVotesOf("3")} votes
            <br></br>
            Priyank Modi: {vo.countVotesOf("4")} votes
            <br></br>
            Sachin Chandani: {vo.countVotesOf("5")} votes
            <br></br>
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="0">NO-ONE</option>
                <option value="1">Srinath</option>
                <option value="2">Bhavyajeet</option>
                <option value="3">Shivaan</option>
                <option value="4">Priyank</option>
                <option value="5">Sachin</option>
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
      return (
        <div>
          Candidate {index} Won the elections
        </div>
      );
    }
    const petition = () => {
      return (<EssayForm />);
    }

    const upvote = () => {
      return <InputForm />
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
    const f1 = () => {
      document.location.href = '../vote';
    }

    const f2 = () => {
      console.log("f2");
      document.location.href = '../petition';
    }
    const homePage = () => {
      return (
        <div>
          <button onClick={f1} >Vote</button>
          <button onClick={f2} >Petition</button>
        </div>
      );
    }
    return (
      <div>


        <div >
          <Router>
            <Route path="/" component={homePage} />
          </Router>

        </div>
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