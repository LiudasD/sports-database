import React, { Component } from 'react';
import Titles from '../General/Titles';
import Range from '../General/Range';
import Edit from '../General/Edit';
import '../Styles/classes.css';
export default class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            something: "list",
            item: '',
        }
    }
    componentDidMount() {
        fetch('/get/zaidejas')
            .then(res => res.json())
            .then(player => this.setState({ players: player }));
    }
    deletion = (e, item) => {
        e.preventDefault();
        fetch('/delete/zaidejas/id_Zaidejas/' + item.id_Zaidejas);
        let array = this.state.players.filter(player => player !== item);
        this.setState({
            players: array,
        })
    }
    update = (e, item) =>{
        fetch('/updateplayer/' + e.target.first.value + '/' + e.target.second.value + '/' + this.state.item.id_Zaidejas);
        this.setState({
            something: true,
        })
        this.componentDidMount();
    }
    displayRange = () => {
        this.setState({
            something: "range",
        })
    }
    submit = async (e) => {
        fetch('/getrange/zaidejas/Ugis/' + e.target.rangeFrom.value + '/' + e.target.rangeTo.value)
            .then(res => res.json())
            .then(item => this.setState({ players: item, something: true }));
    }
    back = () => {
        this.setState({
            something: "list",
        })
    }
    render() {
        return (
            <div>
                {this.state.something === "list" ?
                    <div>
                        <Titles name="Players" openForm={this.openForm} displayRange={this.displayRange} />
                        <table class="ui selectable inverted table">
                            <thead>
                                <tr class="center aligned" >
                                    <th>ID</th>
                                    <th>Vardas</th>
                                    <th>Pavardė</th>
                                    <th>Ūgis</th>
                                    <th>Svoris</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.players.map(player => {
                                        return (
                                            <tr key={player} class="center aligned">
                                                <th key={player.id_Zaidejas}>{player.id_Zaidejas}</th>
                                                <th key={player.Vardas}>{player.Vardas}</th>
                                                <th key={player.Pavarde}>{player.Pavarde}</th>
                                                <th key={player.Ugis}>{player.Ugis}</th>
                                                <th key={player.Svoris}>{player.Svoris}</th>
                                                <th><button class="ui inverted red button" type="onClick" onClick={(e) => this.deletion(e, player)}>Remove </button></th>
                                                <th><button class="ui inverted green button" onClick={() => this.setState({something: "", item: player})}>Edit</button></th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div> : this.state.something === "range" ? <Range back={this.back} attribute="height" submit={this.submit} /> :
                        <Edit back={this.back} firstValue={this.state.item.Ugis} update={this.update} first="Height" secondValue={this.state.item.Svoris} second="Weight" text="Edit media" />}
            </div>
        )
    }
}