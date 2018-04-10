import React, { Component } from 'react';
import Titles from '../General/Titles';
import Range from '../General/Range';
import Edit from '../General/Edit';
import '../Styles/classes.css'
export default class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            something: "list",
            item: '',
        }
    }
    componentDidMount() {
        fetch('/get/komanda')
            .then(res => res.json())
            .then(team => this.setState({ teams: team }));
    }
    deletion = (e, item) => {
        e.preventDefault();
        fetch('/delete/komanda/id_Komanda/' + item.id_Komanda);
        let array = this.state.teams.filter(team => team !== item);
        this.setState({
            teams: array,
        })
    }
    displayRange = () => {
        this.setState({
            something: "range",
        })
        this.componentDidMount();
    }
    submit = async (e) => {
        fetch('/getrange/komanda/Nariuskaicius/' + e.target.rangeFrom.value + '/' + e.target.rangeTo.value)
            .then(res => res.json())
            .then(item => this.setState({ teams: item, something: true }));
    }
    update = (e, item) =>{
        fetch('/updateteam/' + e.target.first.value +  '/' + this.state.item.id_Komanda);
        this.setState({
            something: true,
        })
    }
    back = () =>{
        this.setState({
            something: "list",
        })
    }
    render() {
        return (
            <div>
                {this.state.something === "list" ?
                    <div>
                        <Titles name="Teams" openForm={this.openForm} displayRange={this.displayRange}/>
                        <table class="ui selectable inverted table">
                            <thead>
                                <tr class="center aligned">
                                    <th>ID</th>
                                    <th>Pavadinimas</th>
                                    <th>Narių skaičius</th>
                                    <th>Įkūrimo metai</th>
                                    <th>Talismanas</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.teams.map(team => {
                                        return (
                                            <tr key={team} class="center aligned">
                                                <th key={team.id_Komanda}>{team.id_Komanda}</th>
                                                <th key={team.Pavadinimas}>{team.Pavadinimas}</th>
                                                <th key={team.Nariuskaicius}>{team.Nariuskaicius}</th>
                                                <th key={team.Ikurimometai}>{team.Ikurimometai.substring(0,4)}</th>
                                                <th key={team.Talismanas}>{team.Talismanas}</th>
                                                <th><button class="ui inverted red button" type="onClick" onClick={(e) => this.deletion(e, team)}>Remove </button></th>
                                                <th><button class="ui inverted green button" onClick={() => this.setState({something: "", item: team})}>Edit</button></th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div> :  this.state.something === "range" ?  <Range back={this.back} attribute="team members" submit={this.submit} /> :
                <Edit back={this.back} firstValue={this.state.item.Nariuskaicius} update={this.update} first="Team members" text="Edit team" />}
            </div>
        )
    }
}