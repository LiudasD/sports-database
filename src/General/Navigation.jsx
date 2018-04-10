import React, { Component } from 'react';
import '../Styles/nav.css';
import { Form } from 'semantic-ui-react';
export default class Navigation extends Component {
    render() {
        return (
            <div>
                <Form onChange={this.props.chooseDatabase}>
                    <select className="ui fluid dropdown">
                        <option value="">Choose database table</option>
                        <option value="Federations">Federations</option>
                        <option value="Teams">Teams</option>
                        <option value="Leagues">Leagues</option>
                        <option value="Cities">Cities</option>
                        <option value="Countries">Countries</option>
                        <option value="Sports">Sports</option>
                        <option value="SportsCenters">Sports Centers</option>
                        <option value="Tournaments">Tournaments</option>
                        <option value="Players">Players</option>
                        <option value="Media">Media</option>
                    </select>
                </Form>
            </div>
        )
    }
}
