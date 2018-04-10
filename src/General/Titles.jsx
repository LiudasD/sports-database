import React, { Component } from 'react';
import '../Styles/titles.css';

export default class Titles extends Component {
    render() {
        return (
            <div class="ui menu">

                <h1 class="item">{this.props.name} table</h1>

                <div class="item"><button class="ui grey button" onClick={this.props.displayRange}>Display Range</button></div>

            </div>
        )
    }
}
