import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
export default class Countries extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            form: true,
        })
    }
    insert = (e) => {
        fetch('/insertcountry/'
            + e.target.countryName.value + '/' + e.target.population.value + '/' + e.target.union.value + '/'
            + e.target.continent.value + '/' + e.target.government.value);
        this.setState({
            form: false,
        })
    }
    render() {
        return (
            <div >
                {
                    this.state.form ?
                        <Form onSubmit={(e) => this.insert(e)}>
                            <label>Country Name</label>
                            <input name="countryName" placeholder="Name..." />
                            <label>Population</label>
                            <input name="population" placeholder="Population..." />
                            <label>Union</label>
                            <input name="union" placeholder="Union..." />
                            <label>Continent</label>
                            <select name="continent" className="ui fluid dropdown">
                                <option value="North America">North America</option>
                                <option value="South America">South America</option>
                                <option value="Europe">Europe</option>
                                <option value="Asia">Asia</option>
                                <option value="Australia">Australia</option>
                            </select>
                            <label>Government</label>
                            <select name="government" className="ui fluid dropdown">
                                <option value="respublic">Respublic</option>
                                <option value="dictatorship">Dictatorship</option>
                            </select>
                            <button class="ui grey button" type="onSubmit">Add new Country</button>
                        </Form> : <button class="ui green button" onClick={() => this.setState({ form: true })}>Add another one?</button>
                }
            </div>
        )
    }
}