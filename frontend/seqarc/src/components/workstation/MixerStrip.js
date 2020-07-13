import React, { useEffect, useState, useRef, useCallback } from "react";
import * as skins from "react-rotary-knob-skin-pack";
import useInterval from "../hooks/useInterval";
import LimitedKnobHooks from "./LimitedKnobHooks";

const MixerStrip = ({
  changePan,
  changeVol,
  index,
  triggerInstrument,
  playing,
  meter,
}) => {
  const [volume, setVolume] = useState(0);
  const [pan, setPan] = useState(0);

  // const [vuMeter, setVuMeter] = useState(0);
  // const [timerDelay, setTimerDelay] = useState(null);

  // useEffect(() => {
  //   if (playing) {
  //     setTimerDelay(50);
  //   } else {
  //     setTimeout(() => {
  //       setTimerDelay(null);
  //       setVuMeter(0);
  //     }, 1000);
  //   }
  // }, [playing, setTimerDelay]);

  // useInterval(() => {
  //   setVuMeter(calcMeterHeight(meter.getLevel()));
  // }, timerDelay);

  // const calcMeterHeight = (level) => {
  //   if (level >= -32 && level < 0) {
  //     return 8 + level / 4;
  //   } else if (level === 0) {
  //     return 8;
  //   } else if (level > 0) {
  //     return 8 + Math.abs(level / 4);
  //   } else {
  //     return 0;
  //   }
  // };

  const canvas = useRef(null);
  let ctx = useRef(null);
  useEffect(() => {
    console.log("Canvas context effect fired");
    ctx.current = canvas.current.getContext("2d");
  }, []);

  const meterAnimation = useCallback(() => {
    clearCanvas();
    const meterHeight = calcCanvasMeterHeight(meter.getLevel());
    const meterColor = meterHeight > 128 ? "red" : "green";
    drawMeter(meterHeight, meterColor);
    requestAnimationFrame(meterAnimation)
  }, [meter]);

  const calcCanvasMeterHeight = (level) => {
    if (level >= -128 && level < 0) {
      return 128 + level;
    } else if (level === 0) {
      return 128;
    } else if (level > 0) {
      return 128 + level;
    } else {
      return 0;
    }
  };

  const drawMeter = (meterHeight, color) => {
    ctx.current.fillStyle = color;
    ctx.current.fillRect(
      0,
      canvas.current.height - meterHeight,
      canvas.current.width,
      meterHeight
    );
  };

  const clearCanvas = () => {
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
  };

  useEffect(() => {
    console.log("Start effect fired");
    requestAnimationFrame(meterAnimation);
  }, [meterAnimation]);

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
        {/* <div
          className="meter"
          style={{
            height: vuMeter + "rem",
            background: vuMeter > 8 ? "red" : "#66ff66",
          }}
        /> */}
        <canvas ref={canvas} width="8" height="160" />
      </div>
      <div className="volume">{volume + " db"}</div>
      <div
        className="mix-strip-pad"
        onClick={() => {
          triggerInstrument(index);
        }}
      >
        <div className="mix-strip-number">{index + 1}</div>
      </div>
    </div>
  );
};

export default MixerStrip;
