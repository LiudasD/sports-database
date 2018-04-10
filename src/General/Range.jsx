import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import '../Styles/range.css';
export default class Range extends Component {
    
    render() {
        return (
            <div className="line">
                <ul>
                    <li><h1>Choose {this.props.attribute} range</h1></li>
                    <li><button onClick={this.props.back} class="ui red button">GetBack</button></li>
                    <li>
                        <Form className="form" onSubmit={this.props.submit}>
                            <input type="text" name="rangeFrom" placeholder="Range from" />
                            <input type="text" name="rangeTo" placeholder="Range to" />
                            <button class="ui green button" type="onSubmit">Display</button>
                        </Form>
                    </li>
                </ul>
            </div>
        )
    }
}