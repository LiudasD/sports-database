import React, { Component } from 'react';
import Navigation from './Navigation';
import Cities from '../AddForms/Cities';
import Countries from '../AddForms/Countries';
export default class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = ({
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
                <Navigation chooseDatabase={this.chooseDatabase} />
                {this.state.value === "Cities" && <Cities />}
                {this.state.value === "Countries" && <Countries />}
            </div>
        )
    }
}