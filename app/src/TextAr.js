import React, { Component } from 'react';
import { userDone, pswd, userStatus, PetitionList } from './DataSet'
import { object } from './App'
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, NavLink } from 'reactstrap';
import './App.css';
class EssayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'Type in your petition' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }


    handleSubmit(event) {
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
                    PetitionList.push([title, this.state.value.toString(), object()]);
                    PetitionList[PetitionList.length - 1][2].castVote({ 'elect': title.toString(), 'vote': 1 });
                    console.log("Added petition", title.toString(), this.state.value.toString());
                }
            }
        }
        this.setState({ value: "Paste your petition" })
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
                <label>
                    New Petition >:
            <textarea value={this.state.value} onChange={this.handleChange} rows="20" cols="120" />        </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default EssayForm;