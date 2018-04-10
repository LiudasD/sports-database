import React, { Component } from 'react';
import Titles from '../General/Titles';
import Range from '../General/Range';
import Edit from '../General/Edit';
import '../Styles/classes.css';
export default class Centers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            centers: [],
            something: "list",
            item: '',
        }
    }
    componentDidMount() {
        fetch('/get/sportocentras')
            .then(res => res.json())
            .then(center => this.setState({ centers: center }));
    }
    deletion = (e, item) => {
        e.preventDefault();
        fetch('/delete/sportocentras/id_Sportocentras/' + item.id_Sportocentras);
        let array = this.state.centers.filter(center => center !== item);
        this.setState({
            centers: array,
        })
    }
    displayRange = () => {
        this.setState({
            something: "range",
        })
        this.componentDidMount();
    }
    submit = async (e) => {
        fetch('/getrange/sportocentras/Talpa/' + e.target.rangeFrom.value + '/' + e.target.rangeTo.value)
            .then(res => res.json())
            .then(item => this.setState({ centers: item, something: true }));
    }
    update = (e, item) =>{
        fetch('/updatecenter/' + e.target.first.value + '/' + e.target.second.value + '/' + this.state.item.id_Sportocentras);
        this.setState({
            something: true,
        })
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
                        <Titles name="Sports Centers" openForm={this.openForm} displayRange={this.displayRange} />
                        <table class="ui selectable inverted table">
                            <thead>
                                <tr class="center aligned">
                                    <th>ID</th>
                                    <th>Pavadinimas</th>
                                    <th>Talpa</th>
                                    <th>Įkūrimo metai</th>
                                    <th>Tipas</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.centers.map(center => {
                                        return (
                                            <tr key={center} class="center aligned">
                                                <th key={center.id_Sportocentras}>{center.id_Sportocentras}</th>
                                                <th key={center.Pavadinimas}>{center.Pavadinimas}</th>
                                                <th key={center.Talpa}>{center.Talpa}</th>
                                                <th key={center.Ikurimometai}>{center.Ikurimometai.substring(0, 4)}</th>
                                                <th key={center.Tipas}>{center.Tipas}</th>
                                                <th><button class="ui inverted red button" type="onClick" onClick={(e) => this.deletion(e, center)}>Remove </button></th>
                                                <th><button class="ui inverted green button" onClick={() => this.setState({something: "", item: center})}>Edit</button></th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div> : this.state.something === "range" ? <Range back={this.back} attribute="capacity" submit={this.submit} /> :
                        <Edit  back={this.back} firstValue={this.state.item.Pavadinimas} update={this.update} first="Name" second="Capacity" secondValue={this.state.item.Talpa} text="Edit center" />}
            </div>
        )
    }
}