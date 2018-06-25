import React, { Component } from 'react';
import './ListItem.css'


export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: {},
    }
  }

  onClickDone() {
    var index = this.props.entry;
    this.props.markTodoDone(index);
  }

    render() {
      const items = this.props.entry.done ? "done" : "undone";
        return (
          <div className={items}>
            <span  onClick={this.onClickDone}>&#x2713;</span>
            <p>{this.props.entry}</p>
            <button type="button" className="close" onClick={this.removeList}>&times;</button>
            </div>
        );
    }
}