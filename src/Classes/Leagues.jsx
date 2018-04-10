import React, { Component } from 'react';
import Titles from '../General/Titles';
import Range from '../General/Range';
import Edit from '../General/Edit';
import '../Styles/classes.css';
export default class League extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leagues: [],
            something: "list",
            item: '',
        }
    }
    componentDidMount() {
        fetch('/get/lyga')
            .then(res => res.json())
            .then(league => this.setState({ leagues: league }));
    }
    deletion = (e, item) => {
        e.preventDefault();
        fetch('/delete/lyga/id_Lyga/' + item.id_Lyga);
        let array = this.state.leagues.filter(league => league !== item);
        this.setState({
            league: array,
        })
    }
    displayRange = () => {
        this.setState({
            something: "range",
        })
    }
    submit = async (e) => {
        fetch('/getrange/lyga/Ikurimometai/' + e.target.rangeFrom.value + '/' + e.target.rangeTo.value)
            .then(res => res.json())
            .then(item => this.setState({ leagues: item, something: true }));
    }
    update = (e, item) =>{
        fetch('/updateleague/' + e.target.first.value + '/' + this.state.item.id_Lyga);
        this.setState({
            something: true,
        })
        this.componentDidMount();
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
                        <Titles name="Leagues" openForm={this.openForm} displayRange={this.displayRange}/>
                        <table class="ui selectable inverted table">
                            <thead>
                                <tr class="center aligned">
                                    <th>ID</th>
                                    <th>Pavadinimas</th>
                                    <th>Būstinė</th>
                                    <th>Įkūrimo metai</th>
                                    <th>Rėmėjai</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.leagues.map(league => {
                                        return (
                                            <tr key={league} class="center aligned">
                                                <th key={league.id_Lyga}>{league.id_Lyga}</th>
                                                <th key={league.Pavadinimas}>{league.Pavadinimas}</th>
                                                <th key={league.Bustine}>{league.Bustine}</th>
                                                <th key={league.Ikurimometai}>{league.Ikurimometai.substring(0,4)}</th>
                                                <th key={league.Remejas}>{league.Remejas}</th>
                                                <th><button class="ui inverted red button" type="onClick" onClick={(e) => this.deletion(e, league)}>Remove </button></th>
                                                <th><button class="ui inverted green button" onClick={() => this.setState({something: "", item: league})}>Edit</button></th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div> :  this.state.something === "range" ?  <Range back={this.back} attribute="year of foundation" submit={this.submit} /> :
                <Edit back={this.back} firstValue={this.state.item.Bustine} update={this.update} first="Headquarters" text="Edit league" />}
                 
            </div>
        )
    }
}