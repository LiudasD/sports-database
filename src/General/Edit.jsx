import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
export default class Edition extends Component {

    render() {
        return (
            <div >
                <button onClick={this.props.back} class="ui red button">GetBack</button>
                <Form onSubmit={this.props.update}>
                    <div>
                        <label><h2>{this.props.first}</h2></label>
                        <input type="text" name="first" placeholder={this.props.firstValue} />
                    </div>
                    {
                        this.props.second &&
                        <div>
                            <label><h2>{this.props.second}</h2></label>
                            <input type="text" name="second" placeholder={this.props.secondValue} />
                        </div>
                    }
                    <button class="ui green button" type="onSubmit" onClick={this.props.back} >{this.props.text}</button>
                </Form>
            </div>
        )
    }
}