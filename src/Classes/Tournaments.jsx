import React, { Component } from 'react';
import Titles from '../General/Titles';
import Range from '../General/Range';
import Edit from '../General/Edit';
import '../Styles/classes.css';
export default class Tournaments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournaments: [],
            something: "list",
            item: '',
        }
    }
    componentDidMount() {
        fetch('/get/turnyrai')
            .then(res => res.json())
            .then(tournament => this.setState({ tournaments: tournament }));
    }
    deletion = (e, item) => {
        e.preventDefault();
        fetch('/delete/turnyrai/id_Turnyrai/' + item.id_Turnyrai);
        let array = this.state.tournaments.filter(tournament => tournament !== item);
        this.setState({
            tournaments: array,
        })
    }
    displayRange = () => {
        this.setState({
            something: "range",
        })
    }
    submit = async (e) => {
        fetch('/getrange/turnyrai/id_Turnyrai/' + e.target.rangeFrom.value + '/' + e.target.rangeTo.value)
            .then(res => res.json())
            .then(item => this.setState({ tournaments: item, something: true }));
    }
    back = () =>{
        this.setState({
            something: "list",
        })
    }
    update = (e, item) =>{
        fetch('/updatetournament/' + e.target.first.value +  '/' + this.state.item.id_Turnyrai);
        this.setState({
            something: true,
        })
        this.componentDidMount();
    }
    render() {
        return (
            <div>
                {this.state.something === "list" ?
                    <div>
                        <Titles name="Tournaments"  displayRange={this.displayRange} />
                        <table class="ui selectable inverted table">
                            <thead>
                                <tr class="center aligned">
                                    <th>ID</th>
                                    <th>Pavadinimas</th>
                                    <th>Laikotarpis</th>
                                    <th>Rėmėjai</th>
                                    <th>Sporto centras</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tournaments.map(tournament => {
                                        return (
                                            <tr key={tournament} class="center aligned">
                                                <th key={tournament.id_Turnyrai}>{tournament.id_Turnyrai}</th>
                                                <th key={tournament.Pavadinimas}>{tournament.Pavadinimas}</th>
                                                <th key={tournament.Laikotarpis}>{tournament.Laikotarpis}</th>
                                                <th key={tournament.Remejas}>{tournament.Remejas}</th>
                                                <th key={tournament.Sportocentras}>{tournament.Sportocentras}</th>
                                                <th><button class="ui inverted red button" type="onClick" onClick={(e) => this.deletion(e, tournament)}>Remove </button></th>
                                                <th><button class="ui inverted green button" onClick={() => this.setState({something: "", item: tournament})}>Edit</button></th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div> :  this.state.something === "range" ?  <Range back={this.back} attribute="id" submit={this.submit} /> :
                <Edit back={this.back} firstValue={this.state.item.Laikotarpis} update={this.update} first="When" text="Edit tournament" />}
            </div>
        )
    }
}