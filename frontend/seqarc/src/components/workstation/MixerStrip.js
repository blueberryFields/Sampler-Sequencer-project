import React, { useState, useEffect } from "react";
import * as skins from "react-rotary-knob-skin-pack";
import LimitedKnobHooks from "./LimitedKnobHooks";
// import useInterval from "../hooks/useInterval";

const MixerStrip = ({
  changePan,
  changeVol,
  index,
  activeStep,
  meter,
  triggerInstrument,
}) => {
  const [volume, setVolume] = useState(0);
  const [pan, setPan] = useState(0);

  useEffect(() => {
    changePan(index, pan);
  }, [pan, changePan, index]);

  useEffect(() => {
    changeVol(index, volume);
  }, [volume, changeVol, index]);

  const lorR = (panVal) => {
    if (panVal < 0) {
      return "L";
    } else if (panVal > 0) {
      return "R";
    } else {
      return "";
    }
  };

  return (
    <div className="mixer-strip-container">
      <div className="pan-container">
        <LimitedKnobHooks
          style={{ display: "inline-block" }}
          min={-100}
          max={100}
          unlockDistance={0}
          preciseMode={true}
          skin={skins.s13}
          setPan={setPan}
        />
        <div className="pan">
          {lorR(pan)} {pan}
        </div>
      </div>
      <div className="slider-container">
        <input
          className="vol-slider"
          type="range"
          min="-36"
          max="12"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
      <div className="meter-container">
        <div
          className="meter"
          style={{
            height: meter + "rem",
            background: meter > 8 ? "red" : "#66ff66",
          }}
        />
      </div>
      <div className="volume">{volume + " db"}</div>
      <div className="mix-strip-pad" onClick={() => triggerInstrument(index)}>
        <div className="mix-strip-number">{index + 1}</div>
      </div>
    </div>
  );
};

export default MixerStrip;
