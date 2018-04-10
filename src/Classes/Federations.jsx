import React, { Component } from 'react';
import Titles from '../General/Titles';
import Range from '../General/Range';
import Edit from '../General/Edit';
import '../Styles/classes.css';
export default class Federation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            federations: [],
            something: "list",
            item: '',
        }
    }
    componentDidMount() {
        fetch('/get/federacija')
            .then(res => res.json())
            .then(federation => this.setState({ federations: federation }));
    }
    deletion = (e, item) => {
        e.preventDefault();
        fetch('/delete/federacija/id_Federacija/' + item.id_Federacija);
        let array = this.state.federation.filter(federation => federation !== item);
        this.setState({
            federation: array,
        })
    }
    displayRange = () => {
        this.setState({
            something: "range",
        })
    }
    update = (e, item) =>{
        fetch('/updatefederation/' + e.target.first.value + '/' + this.state.item.id_Federacija);
        this.setState({
            something: true,
        })
        this.componentDidMount();
    }
    submit = async (e) => {
        fetch('/getrange/federacija/Ikurimometai/' + e.target.rangeFrom.value + '/' + e.target.rangeTo.value)
            .then(res => res.json())
            .then(item => this.setState({ federations: item, something: true }));
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
                        <Titles name="Federations" openForm={this.openForm} displayRange={this.displayRange} />
                        <table class="ui selectable inverted table">
                            <thead>
                                <tr class="center aligned">
                                    <th>ID</th>
                                    <th>Pavadinimas</th>
                                    <th>Trumpinys</th>
                                    <th>Įkūrimo metai</th>
                                    <th>Žemynas</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.federations.map(federation => {
                                        return (
                                            <tr key={federation} class="center aligned">
                                                <th key={federation.id_Federacija}>{federation.id_Federacija}</th>
                                                <th key={federation.Pavadinimas}>{federation.Pavadinimas}</th>
                                                <th key={federation.Trumpinys}>{federation.Trumpinys}</th>
                                                <th key={federation.Ikurimometai}>{federation.Ikurimometai.substring(0, 4)}</th>
                                                <th key={federation.Zemynas}>{federation.Zemynas}</th>
                                                <th><button class="ui inverted red button" type="onClick" onClick={(e) => this.deletion(e, federation)}>Remove </button></th>
                                                <th><button class="ui inverted green button" onClick={() => this.setState({something: "", item: federation})}>Edit</button></th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div> : this.state.something === "range" ? <Range back={this.back} attribute="year of foundation" submit={this.submit} /> :
                        <Edit back={this.back} firstValue={this.state.item.Pavadinimas} update={this.update} first="Name" text="Edit federation" />}
            </div>
        )
    }
}