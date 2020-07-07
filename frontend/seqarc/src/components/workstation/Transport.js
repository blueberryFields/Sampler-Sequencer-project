import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faInfinity } from "@fortawesome/free-solid-svg-icons";
import "./Workstation.css";
import { deleteFromStorage } from "@rehooks/local-storage";
import jwtDecode from "jwt-decode";
import Login from "../login/Login";

const Transport = (props) => {
  const [showLogin, setShowLogin] = useState(false);

  const { token } = props;

  const convertPercentToFloat = (percent) => {
    return percent / 100;
  };

  const convertFloatToPercent = (float) => {
    return float * 100;
  };

  const onPlay = () => {
    props.toggleTransport();
  };

  const [bpm, setBpm] = useState(props.getBpm);

  const updateBpm = () => {
    if (!isNaN(bpm) && bpm >= 60 && bpm <= 240) {
      props.updateBpm(bpm);
    } else {
      setBpm(props.getBpm);
    }
  };

  const [swing, setSwing] = useState(convertFloatToPercent(props.getSwing));

  const updateSwing = () => {
    if (swing && !isNaN(swing) && swing >= 0 && swing <= 100) {
      props.updateSwing(convertPercentToFloat(swing));
    } else {
      setSwing(convertFloatToPercent(props.getSwing));
    }
  };

  const decodeJWT = useCallback(() => {
    return jwtDecode(token);
  }, [token]);

  return (
    <div className="transport-bar">
      <div className="transport-items">
        <div className="logo">
          SeqArc
          <FontAwesomeIcon className="infinity" icon={faInfinity} />
        </div>
        <div className="transport-button" onClick={() => props.initialize()}>
          Initialize
        </div>
      </div>
      <div className="transport">
        <div className="display">
          <div className="display-part">
            <div className="bpm-heading">Bpm:</div>
            <input
              type="text"
              className="bpm"
              name="bpm"
              value={bpm}
              onChange={(e) => setBpm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  updateBpm();
                }
              }}
              onBlur={() => updateBpm()}
            />
          </div>
          <div className="display-divider" />
          <div className="display-part">
            <div className="swing-heading">Swing:</div>
            <input
              type="text"
              className="swing"
              name="swing"
              value={swing}
              onChange={(e) => setSwing(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  updateSwing();
                }
              }}
              onBlur={() => updateSwing()}
            />
            <div className="percent-char">%</div>
          </div>
          <div className="display-divider" />
          <div className="display-part">
            <div className="position">{props.position}</div>
          </div>
        </div>
        <button
          className={
            props.playing ? "toggle-play playing" : "toggle-play stopped"
          }
          type="button"
          onClick={() => onPlay()}
        >
          <FontAwesomeIcon icon={props.playing ? faStop : faPlay} />
        </button>
      </div>
      <div className="transport-items trans-right">
        {props.token ? (
          <>
            <div className="logged-in-as">Logged in as {decodeJWT().sub}</div>
            <div
              className="transport-button"
              onClick={() => deleteFromStorage("jwt")}
            >
              Logout
            </div>
          </>
        ) : (
          <div className="dropdown">
            <div
              className="transport-button "
              onClick={() => {
                showLogin ? setShowLogin(false) : setShowLogin(true);
              }}
            >
              Login
            </div>
            {showLogin && <Login setShowLogin={setShowLogin} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transport;
