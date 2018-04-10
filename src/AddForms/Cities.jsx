import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import Cities from '../Classes/Cities';
export default class City extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            countries: [],
            form: true,
            show: false,
        })
    }
    componentDidMount() {
        fetch('/get/salis')
            .then(res => res.json())
            .then(country => this.setState({ countries: country }));
    }
    insert = (e) => {
        fetch('/insertcity/'
            + e.target.cityName.value + '/' + e.target.population.value + '/' + e.target.capital.value + '/'
            + e.target.area.value + '/' + e.target.country.value);
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
                            <label>City Name</label>
                            <input name="cityName" placeholder="Name..." />
                            <label>Population</label>
                            <input name="population" placeholder="Population..." />
                            <label>Area</label>
                            <input name="area" placeholder="Area..." />
                            <label>City Name</label>
                            <select name="capital" className="ui fluid dropdown">
                                <option value="1">Capital</option>
                                <option value="0">Not capital</option>
                            </select>
                            <label>Country</label>
                            <select name="country" className="ui fluid dropdown">
                                {
                                    this.state.countries.map(country => {
                                        return <option value={country.id_Salis} key={country.id_Salis}>{country.Pavadinimas}</option>
                                    })
                                }
                            </select>
                            <button class="ui grey button" type="onSubmit">Add new City</button>
                        </Form> : !this.state.true ?
                            <div class="ui buttons">
                                <button class="ui red button" onClick={() => this.setState({ show: true })}>See table</button>
                                <div class="or"></div>
                                <button class="ui green button" onClick={() => this.setState({ form: true })}>Add another one?</button>
                            </div>
                            :
                            <Cities />

                }
            </div>
        )
    }
}