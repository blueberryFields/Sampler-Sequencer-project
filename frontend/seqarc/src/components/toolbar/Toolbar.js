import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Workstation from "../workstation/Workstation";
import Home from "../home/Home";
import Profile from "../profile/Profile";
import Login from "../login/Login"
import Register from "../register/Register"
import './Toolbar.css'
import {faInfinity} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useLocalStorage, deleteFromStorage} from '@rehooks/local-storage';


const Toolbar = (props) => {

    const [token] = useLocalStorage('jwt');

    return (
        <Router>
            <header className="toolbar">
                <nav className="toolbar_navigation">
                    
                    <div className="spacer"/>
                    <div className="toolbar_navigation_items">
                        <ul className="navbar">
                            <li>
                                <Link to="/workstation">Workstation</Link>
                            </li>
                            {token ?
                                <ul>
                                    <li>
                                        <Link to="/profile">Profile</Link>
                                    </li>
                                    <li onClick={() => deleteFromStorage('jwt')}>
                                        <Link to="/logout">Logout</Link>
                                    </li>
                                </ul>
                                :
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            }
                        </ul>
                    </div>
                </nav>
            </header>
            <main className="main">
                <Switch>
                    <Route path="/workstation">
                        <Workstation
                            instruments={props.instruments}
                            addNewInstrument={props.addNewInstrument}
                            deleteInstrument={props.deleteInstrument}
                            addNote={props.addNote}
                            removeNote={props.removeNote}
                            selectInstrumentSample={props.selectInstrumentSample}
                            editSampleModeValue={props.editSampleModeValue}
                            setEditSampleModeValue={props.setEditSampleModeValue}
                            noteValues={props.noteValues}
                            changeNoteValue={props.changeNoteValue}
                            toggleStepOn={props.toggleStepOn}
                            initialize={props.initialize}
                            changeVol={props.changeVol}
                            changePan={props.changePan}
                            token={token}
                        />
                    </Route>
                    <Route path="/profile">
                        <Profile
                            token={token}
                        />
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </main>
        </Router>
    )
}

export default Toolbar;