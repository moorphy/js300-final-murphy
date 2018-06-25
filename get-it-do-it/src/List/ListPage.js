import React, { Component } from 'react';
import firebase from 'firebase';
import './ListPage.css';
import ListItem from './ListItem';

const db = firebase.database();
const auth = firebase.auth();

class ListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItem: {},
            entryInput: ''
        }
    }
    componentDidMount() {
        if(!auth.currentUser) {
            alert("You must be logged in");
            return this.props.history.push('/');
        }
        db.ref(`/users/${auth.currentUser.uid}`)
        .on('value', (snapshot)=>{
            this.setState(()=> {
                return {
                    listItem: snapshot.val() || {}
                };
            });
        })
        
    }
    onInputChange = (e) => {
        e.preventDefault();
        const newValue = e.target.value;
        this.setState(() => {
            return {
                entryInput: newValue
            };
        })
    }
    removeList= (e) => {
        e.preventDefault();
        db.ref(`/users/${auth.currentUser.uid}`)
        .on('value', (listItem)=>{
            listItem.remove()
            });
    }

    addList = (e) => {
        e.preventDefault();
        db.ref(`/users/${auth.currentUser.uid}`)
        .push(this.state.entryInput);
       // alert('Implement addEntry');
        this.setState(() => {
            return {
                entryInput: ''
            };
        })
    }

    render() {
        return (
            <div className="listPage">
                <h1>GET IT - DO IT</h1>
                {Object.keys(this.state.listItem).map((key) => {
                    return <ListItem key={key} entry={this.state.listItem[key]}/>;                
                
                })}

                <form className="listItemForm" onSubmit={this.addList}>
                    <textarea onChange={this.onInputChange} value={this.state.entryInput} /><br />
                    <button className="listItembutton" type="submit">Add List</button>
                </form>
            </div>
        );
    }
}

export default ListPage;