import React, { Component } from 'react';
import './App.css';
import Message from './components/message/message.component';
class App extends Component {
  localState = {};
  constructor(props) {
    super(props);
    this.state = { user: '', showMessage: undefined, hasCountReached: false };
  }

  componentDidMount() {
    this.localState = this.getStateFromLocalStorage('userData') || {};
  }

  onChangeHandler = (event) => {
    this.setState({ user: event.target.value });
  };
  onSubmitHandler = () => {
    if (!this.localState[this.state.user]) {
      this.localState[this.state.user] = 1;
    } else {
      const count = this.localState[this.state.user];
      if (count === 5) {
        this.setState({
          hasCountReached: true,
        });
      } else {
        this.localState[this.state.user] = count + 1;
        this.setState({
          hasCountReached: false,
        });
      }
    }
    this.setState({
      user: '',
      showMessage: `${this.state.user} has been submitted ${
        this.localState[this.state.user]
      } many times`,
    });
    this.setStateToLocalStorage('userData', this.localState);
  };

  setStateToLocalStorage = (key, state) => {
    localStorage.setItem(key, JSON.stringify(state));
  };

  getStateFromLocalStorage = (key) => {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
  };

  getClassNameForMessage = () => {
    let className = 'message-container';
    if (this.state.hasCountReached) {
      className = `${className} danger`;
    }
    return className;
  };
  render() {
    return (
      <div className="App">
        {this.state.showMessage ? (
          <Message
            classes={this.getClassNameForMessage()}
            messageText={this.state.showMessage}
          />
        ) : null}
        <input
          type="text"
          onChange={(e) => this.onChangeHandler(e)}
          value={this.state.user}
        />
        <br />
        <button
          className="btn"
          disabled={this.state.hasCountReached}
          onClick={this.onSubmitHandler}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default App;
