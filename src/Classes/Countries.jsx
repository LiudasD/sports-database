import React, { Component } from 'react';
import Titles from '../General/Titles';
import Range from '../General/Range';
import Edit from '../General/Edit';
import '../Styles/classes.css';
export default class Countries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            something: "list",
            item: '',
        }
    }
    componentDidMount() {
        fetch('/get/salis')
            .then(res => res.json())
            .then(country => this.setState({ countries: country }));
    }
    deletion = (e, item) => {
        e.preventDefault();
        fetch('/delete/salis/id_Salis/' + item.id_Salis);
        let array = this.state.countries.filter(country => country !== item);
        this.setState({
            countries: array,
        })
    }
    displayRange = () => {
        this.setState({
            something: "range",
        })
    }
    submit = async (e) => {
        fetch('/getrange/salis/Gyventojuskaicius/' + e.target.rangeFrom.value + '/' + e.target.rangeTo.value)
            .then(res => res.json())
            .then(item => this.setState({ countries: item, something: true }));
    }
    update = (e) =>{
        fetch('/updatecountry/' + e.target.first.value + '/' + this.state.item.id_Salis);
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
                        <Titles name="Countries" displayRange={this.displayRange}/>
                        <table class="ui selectable inverted table">
                            <thead>
                                <tr class="center aligned">
                                    <th>ID</th>
                                    <th>Pavadinimas</th>
                                    <th>Gyventojų skaičius</th>
                                    <th>Sąjunga</th>
                                    <th>Žemynas</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.countries.map(country => {
                                        return (
                                            <tr key={country} class="center aligned">
                                                <th key={country.id_Salis}>{country.id_Salis}</th>
                                                <th key={country.Pavadinimas}>{country.Pavadinimas}</th>
                                                <th key={country.Gyventojuskaicius}>{country.Gyventojuskaicius}</th>
                                                <th key={country.Sajunga}>{country.Sajunga}</th>
                                                <th key={country.Zemynas}>{country.Zemynas}</th>
                                                <th><button class="ui inverted red button" type="onClick" onClick={(e) => this.deletion(e, country)}>Remove </button></th>
                                                <th><button class="ui inverted green button" onClick={() => this.setState({something: "", item: country})}>Edit</button></th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div> : this.state.something === "range" ? <Range back={this.back} attribute="Population" submit={this.submit} /> : 
                    <Edit back={this.back} text="Edit country" firstValue={this.state.item.Gyventojuskaicius} update={this.update} first="Population"/>}
            </div>
        )
    }
}