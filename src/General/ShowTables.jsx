import React, { Component } from 'react';
import Navigation from '../General/Navigation';
import Federations from '../Classes/Federations';
import Teams from '../Classes/Teams';
import Leagues from '../Classes/Leagues';
import Cities from '../Classes/Cities';
import Countries from '../Classes/Countries';
import Sports from '../Classes/Sports';
import Centers from '../Classes/SportsCenters';
import Tournaments from '../Classes/Tournaments';
import Players from '../Classes/Players';
import Media from '../Classes/Media';

export default class ShowTables extends Component {
    constructor(props){
        super(props);
        this.state =({
            value: '',
        })
    }
    chooseDatabase = async (e) => {
        console.log(e.target.value);
        this.setState({
            value: e.target.value,
        })
    }
    render() {
        return (
            <div>
                <Navigation chooseDatabase={this.chooseDatabase}/>
                {this.state.value === "Cities" && <Cities />}
                {this.state.value === "Teams" && <Teams />}
                {this.state.value === "Leagues" && <Leagues />}
                {this.state.value === "Federations" && <Federations />}
                {this.state.value === "Countries" && <Countries />}
                {this.state.value === "Sports" && <Sports />}
                {this.state.value === "SportsCenters" && <Centers />}
                {this.state.value === "Tournaments" && <Tournaments />}
                {this.state.value === "Players" && <Players />}
                {this.state.value === "Media" && <Media />}
            </div>
        )
    }
}