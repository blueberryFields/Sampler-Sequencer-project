import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Workstation from "../workstation/Workstation";
import Home from "../home/Home";
import About from "../about/About";
import Profile from "../profile/Profile";
import Login from "../login/Login"
import './Toolbar.css'
import jwtDecode from 'jwt-decode'
import {faInfinity} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useLocalStorage, deleteFromStorage } from '@rehooks/local-storage';



const Toolbar = (props) => {

    const [token, setToken] = useLocalStorage('jwt');

    const decodeJWT = () => {
        return jwtDecode(token)
    }

    return (
        <Router>
            <header className="toolbar">
                <nav className="toolbar_navigation">
                    <div className="toolbar_logo">
                        <Link
                            to="/">
                            SeqArc
                            <FontAwesomeIcon
                                className="infinity"
                                icon={faInfinity}/>
                        </Link>
                    </div>
                    <div className="spacer"/>
                    <div className="toolbar_navigation_items">
                        <ul className="navbar">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/workstation">Workstation</Link>
                            </li>
                            {token ?
                            <span>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li> 
                                <li onClick={() => deleteFromStorage('jwt')}>
                                    <Link to="/logout">Logout</Link>
                                </li> 
                                </span>: <div>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                </div>
                            }
                            {/* {!token ? 
                            <li>
                                <Link to="/login">Login</Link>
                            </li>: <Link to="/logout">Logout</Link>
                            } */}
                        </ul>
                    </div>
                </nav>
            </header>
            <main className="main">
                <Switch>
                    <Route path="/about">
                        <About/>
                        <div>{props.editSampleModeValue}</div>
                    </Route>
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
                        />
                    </Route>
                    <Route path="/profile">
                        <Profile/>
                    </Route>
                    <Route path="/login">
                        <Login/>
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