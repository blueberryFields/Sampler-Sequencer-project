import React, { useEffect, useState, useRef, useCallback } from "react";
import * as skins from "react-rotary-knob-skin-pack";
import LimitedKnobHooks from "./LimitedKnobHooks";

const MixerStrip = ({
  changePan,
  changeVol,
  index,
  triggerInstrument,
  meter,
}) => {
  const [volume, setVolume] = useState(0);
  const [pan, setPan] = useState(0);

  // VU-meter animation

  const canvas = useRef(null);
  let ctx = useRef(null);
  let animation = useRef();

  useEffect(() => {
    ctx.current = canvas.current.getContext("2d");
  }, []);

  const meterAnimation = useCallback(() => {
    if (canvas.current) {
      clearCanvas();
      const meterHeight = calcCanvasMeterHeight(meter.getLevel() * 3);
      const meterColor = meterHeight > 128 ? "red" : "green";
      drawMeter(meterHeight, meterColor);
      requestAnimationFrame(meterAnimation);
    }
  }, [meter]);

  const calcCanvasMeterHeight = (level) => {
    console.log(level);
    if (level >= -128) {
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
    animation.current = requestAnimationFrame(meterAnimation);
    return function cleanup() {
      cancelAnimationFrame(animation);
    };
  }, [meterAnimation]);

  // Volume and panning

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
