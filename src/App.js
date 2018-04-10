import React, { Component } from 'react';
//all generic imports
import AddForm from './General/AddForm';
import ShowTables from './General/ShowTables';
import './Styles/app.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      value: '',
      display: 'menu',
    })
  }
  render() {
    return (
      <div>
        <div class="ui menu">
          <div class="header item">
            <h1><a onClick={() => this.setState({display: 'meniu'})}>Sports Database PRIMINIMAS SAU - PAIMK PASKUTINĮ ID IR JĮ INCREMENTINK EVRI TIME :)</a></h1>
          </div>
          <div class="item">
            <div class="ui buttons">
              <button class="ui button" onClick={() => this.setState({ display: 'showtables' })}>See databases</button>
              <div class="or"></div>
              <button class="ui black button" onClick={() => this.setState({ display: 'addnew' })}>Add new objects</button>
            </div>
          </div>
        </div>
        {
          this.state.display === 'addnew' ?
            <AddForm className="random" /> : this.state.display === 'showtables' ?
              <ShowTables className="random" />
              : <div></div>
        }
      </div>
    );
  }
}
export default App;
