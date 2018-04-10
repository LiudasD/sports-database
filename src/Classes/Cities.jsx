import React, { Component } from 'react';
import Titles from '../General/Titles';
import Range from '../General/Range';
import '../Styles/classes.css';
import Edit from '../General/Edit';
export default class Cities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            something: "list",
            item: '',
        }
    }
    componentDidMount() {
        fetch('/get/miestas')
            .then(res => res.json())
            .then(city => this.setState({ cities: city }));
    }
    toLithuanian = (value) => {
        if (value === 1)
            return "Sostinė";
        return "-";
    }
    deletion = (e, item) => {
        e.preventDefault();
        fetch('/delete/miestas/id_Miestas/' + item.id_Miestas);
        let array = this.state.cities.filter(city => city !== item);
        this.setState({
            cities: array,
            item: '',
        })
    }
    update = (e, item) =>{
        fetch('/updatecity/' + e.target.first.value + '/' + e.target.second.value + '/' + this.state.item.id_Miestas);
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
        fetch('/getrange/miestas/Plotas/' + e.target.rangeFrom.value + '/' + e.target.rangeTo.value)
        .then(res => res.json())
        .then(city => this.setState({ cities: city, something: "list" }));
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
                        <Titles name="Cities" displayRange={this.displayRange} />
                        <table class="ui selectable inverted table">
                            <thead>
                                <tr class="center aligned">
                                    <th>ID</th>
                                    <th>Pavadinimas</th>
                                    <th>Gyventojų skaičius</th>
                                    <th>Sostinė</th>
                                    <th>Plotas</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.cities.map(city => {
                                        return (
                                            <tr key={city} class="center aligned">
                                                <th key={city.id_Miestas}>{city.id_Miestas}</th>
                                                <th key={city.Pavadinimas}>{city.Pavadinimas}</th>
                                                <th key={city.Gyventojuskaicius}>{city.Gyventojuskaicius}</th>
                                                <th key={city.Sostine}>{this.toLithuanian(city.Sostine)}</th>
                                                <th key={city.Plotas}>{city.Plotas}</th>
                                                <th><button class="ui inverted red button" type="onClick" onClick={(e) => this.deletion(e, city)}>Remove </button></th>
                                                <th><button class="ui inverted green button" onClick={() => this.setState({something: "", item: city})}>Edit</button></th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div> :  this.state.something === "range" ? <Range back={this.back} attribute="area" submit={this.submit}/> : 
                    <Edit back={this.back} className="display" firstValue={this.state.item.Gyventojuskaicius} secondValue={this.state.item.Plotas} update={this.update} first="Population" second="Area" text="Edit city"/>}
            </div>
        )
    }
}