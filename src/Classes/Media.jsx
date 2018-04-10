import React, { Component } from 'react';
import Titles from '../General/Titles';
import Range from '../General/Range';
import Edit from '../General/Edit';
import '../Styles/classes.css';
export default class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Media: [],
            something: "list",
            item: '',
        }
    }
    componentDidMount() {
        fetch('/get/ziniasklaida')
            .then(res => res.json())
            .then(media => this.setState({ Media: media }));
    }
    deletion = (e, item) => {
        e.preventDefault();
        fetch('/delete/ziniasklaida/id_Ziniasklaida/' + item.id_Ziniasklaida);
        let array = this.state.Media.filter(media => media !== item);
        this.setState({
            Media: array,
        })
    }
    displayRange = () => {
        this.setState({
            something: "range",
        })
    }
    update = (e, item) =>{
        fetch('/updatemedia/' + e.target.first.value + '/' + this.state.item.id_Media);
        this.setState({
            something: true,
        })
        this.componentDidMount();
    }
    submit = async (e) => {
        fetch('/getrange/ziniasklaida/Reitingas/' + e.target.rangeFrom.value + '/' + e.target.rangeTo.value)
            .then(res => res.json())
            .then(item => this.setState({ Media: item, something: true }));
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
                        <Titles name="Media" openForm={this.openForm} displayRange={this.displayRange} />
                        <table class="ui selectable inverted table">
                            <thead>
                                <tr class="center aligned">
                                    <th>ID</th>
                                    <th>Pavadinimas</th>
                                    <th>Žurnalistai</th>
                                    <th>Reitingas</th>
                                    <th>Tipas</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Media.map(media => {
                                        return (
                                            <tr key={media} class="center aligned">
                                                <th key={media.id_Ziniasklaida}>{media.id_Ziniasklaida}</th>
                                                <th key={media.Pavadinimas}>{media.Pavadinimas}</th>
                                                <th key={media.Zurnalistai}>{media.Zurnalistai}</th>
                                                <th key={media.Reitingas}>{media.Reitingas}</th>
                                                <th key={media.Tipas}>{media.Tipas}</th>
                                                <th><button class="ui inverted red button" type="onClick" onClick={(e) => this.deletion(e, media)}>Remove </button></th>
                                                <th><button class="ui inverted green button" onClick={() => this.setState({something: "", item: media})}>Edit</button></th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div> : this.state.something === "range" ? <Range back={this.back} attribute="rank" submit={this.submit} /> :
                        <Edit back={this.back} firstValue={this.state.item.Reitingas} update={this.update} first="Rank" text="Edit media" />}
            </div>
        )
    }
}