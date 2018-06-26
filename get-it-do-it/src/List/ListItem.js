import React, { Component } from 'react';
import './ListItem.css';
import firebase from 'firebase';

const db = firebase.database();
const auth = firebase.auth();

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: {},
      notdone: false
    }
  }

  onClickDone() {
    this.setState({notdone: !this.state.notdone})
  }

  removeList= (e) => {
    db.ref(`/users/${auth.currentUser.uid}`).child(e).remove();
}

    render() {
      let items = this.state.notdone ? "done" : "notdone";
        return (
          <div className="listItem">
          <div className={items}>
            <span onClick={this.onClickDone.bind(this)}>&#x2713;</span>
            <p>{this.props.entry}</p>
            {/* <button type="button" className="close" onClick={this.removeList(this.props.entry)}>&times;</button> */}
            </div>
            </div>
        );
    }
}