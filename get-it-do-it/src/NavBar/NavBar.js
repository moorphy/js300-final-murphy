import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import './NavBar.css';

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }
    componentDidMount() {
        auth.onAuthStateChanged((user)=> {
            console.log(user);
            this.setState(() => {
                return {
                     isLoggedIn: user ? true: false
                    };
            });
        });
    }
    signIn = () => {
        auth.signInWithPopup(provider);
    }

    signOut = () => {
        auth.signOut();
    }

    render() {
        return (
            <ul className="navigation-bar">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/yourlist"> List </Link></li>
                {!this.state.isLoggedIn && <li><a href="#signin" onClick={this.signIn}>Sign In</a></li>}
                {this.state.isLoggedIn && <li><a href="#signout" onClick={this.signOut}>Sign Out</a></li>}
            </ul>
        );
    }
}

export default NavBar;