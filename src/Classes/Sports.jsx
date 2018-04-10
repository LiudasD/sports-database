import React, { Component } from 'react';
import Titles from '../General/Titles';
import Range from '../General/Range';
import Edit from '../General/Edit';
import '../Styles/classes.css';
export default class Sports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sports: [],
            something: "list",
            item: '',
        }
    }
    componentDidMount() {
        fetch('/get/sportas')
            .then(res => res.json())
            .then(sport => this.setState({ sports: sport }));
    }
    deletion = (e, item) => {
        e.preventDefault();
        fetch('/delete/sportas/id_Sportas/' + item.id_Sportas);
        let array = this.state.sports.filter(sport => sport !== item);
        this.setState({
            sports: array,
        })
    }
    displayRange = () => {
        this.setState({
            something: "range",
        })
    }
    update = (e, item) =>{
        fetch('/updatesport/' + e.target.first.value + '/' + this.state.item.id_Sportas);
        this.setState({
            something: true,
        })
        this.componentDidMount();
    }
    submit = async (e) => {
        fetch('/getrange/sportas/Kilmesddata/' + e.target.rangeFrom.value + '/' + e.target.rangeTo.value)
            .then(res => res.json())
            .then(item => this.setState({ sports: item, something: true }));
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
                        <Titles name="Sports" openForm={this.openForm} displayRange={this.displayRange} />
                        <table class="ui selectable inverted table">
                            <thead>
                                <tr class="center aligned">
                                    <th>ID</th>
                                    <th>Pavadinimas</th>
                                    <th>Olimpiadinis sportas</th>
                                    <th>Komandinis sportas</th>
                                    <th>Kilmės data</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.sports.map(sport => {
                                        return (
                                            <tr key={sport} class="center aligned">
                                                <th key={sport.id_Sportas}>{sport.id_Sportas}</th>
                                                <th key={sport.Pavadinimas}>{sport.Pavadinimas}</th>
                                                <th key={sport.Komandinissportas}>{sport.Komandinissportas === "1" ? "Taip" : "Ne"}</th>
                                                <th key={sport.Olimpiadinissportas}>{sport.Olimpiadinissportas}</th>
                                                <th key={sport.Kilmesddata}>{sport.Kilmesddata.substring(0, 4)}</th>
                                                <th><button class="ui inverted red button" type="onClick" onClick={(e) => this.deletion(e, sport)}>Remove </button></th>
                                                <th><button class="ui inverted green button" onClick={() => this.setState({something: "", item: sport})}>Edit</button></th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div> : this.state.something === "range" ? <Range back={this.back} attribute="year of foundation" submit={this.submit} /> :
                        <Edit back={this.back} firstValue={this.state.item.Olimpiadinissportas} update={this.update} first="Olympic" text="Edit sport" />}
            </div>
        )
    }
}