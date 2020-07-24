import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocalStorage } from "@rehooks/local-storage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Tone from "tone";
import Instrument from "./Instrument";
import MixerStrip from "./MixerStrip";
import SampleBrowser from "./SampleBrowser";
import Transport from "./Transport";
import WarningBanner from "../warningbanner/WarningBanner";

const Workstation = ({
  instruments,
  addNewInstrument,
  deleteInstrument,
  addNote,
  removeNote,
  selectInstrumentSample,
  editSampleModeValue,
  setEditSampleModeValue,
  toggleStepOn,
  changeNoteValue,
  noteValues,
  initialize,
  changeVol,
  changePan,
}) => {
  const [token] = useLocalStorage("jwt");

  // Transport-related stuff

  const formatPosition = (position) => {
    return (
      position.split(":")[1] +
      ":" +
      parseFloat(position.split(":")[2]).toFixed(0)
    );
  };
  
  const [position, setPosition] = useState(formatPosition(Tone.Transport.position));

  const [playing, setPlaying] = useState(false);


  const [bpm, setBpm] = useState(Tone.Transport.bpm.value);

  const updateBpm = (bpm) => {
    Tone.Transport.bpm.value = bpm;
    setBpm(bpm);
  };

  const [swing, setSwing] = useState(Tone.Transport.swing);

  const updateSwing = (swing) => {
    Tone.Transport.swing = swing;
    setSwing(swing);
  };

  const toggleTransport = useCallback(() => {
    Tone.Transport.toggle();
    if (playing) {
      setPosition(formatPosition(Tone.Transport.position));
      setTimeout(() => setActiveStep(-1), 50);
    }
    setPlaying(!playing);
  }, [playing]);

  // ACTIVE STEPS
  // Keeps track of active steps which Instrument listens to and lights LEDs accordingly
  const [activeStep, setActiveStep] = useState(-1);

  const stepForward = useCallback(() => {
    stepperRef.current < 15
      ? setActiveStep(stepperRef.current + 1)
      : setActiveStep(0);
    setPosition(formatPosition(Tone.Transport.position));
  }, []);

  useEffect(() => {
    Tone.Transport.scheduleRepeat(stepForward, "16n");
  }, [stepForward]);

  const stepperRef = useRef(activeStep);

  useEffect(() => {
    stepperRef.current = activeStep;
  }, [activeStep]);

  // Sample-auditioner

  const auditionVol = useRef(new Tone.Volume(-6));
  const sampleAuditioner = useRef(
    new Tone.Player().chain(auditionVol.current, Tone.Master)
  );

  const setAuditionVol = (decibel) => {
    auditionVol.current.volume.value = decibel;
  };

  const auditSample = (name) => {
    sampleAuditioner.current.load(`samples/${name}`, () => {
      sampleAuditioner.current.start();
    });
  };

  // Instrument auditioning
  const triggerInstrument = (index) => {
    if (instruments[index].instrument.loaded)
      instruments[index].instrument.triggerAttack("C3");
  };

  // If user-screen width is < 1035, show warning that says site is not made for this small screen
  const [warningIsShowing, setShowWarning] = useState(false);
  useEffect(() => {
    let width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 1035) setShowWarning(true);
  }, []);

  return (
    <div className="container">
      <WarningBanner
        warningIsShowing={warningIsShowing}
        hideWarning={() => setShowWarning(false)}
      />
      <Transport
        playing={playing}
        toggleTransport={toggleTransport}
        updateBpm={updateBpm}
        getBpm={bpm}
        updateSwing={updateSwing}
        getSwing={swing}
        position={position}
        initialize={initialize}
        token={token}
      />
      <div className="split-pane-vertical">
        <div className="sample-browser-section">
          <SampleBrowser
            auditSample={auditSample}
            setAuditionVol={setAuditionVol}
            selectInstrumentSample={selectInstrumentSample}
            editSampleModeValue={editSampleModeValue}
            token={token}
          />
        </div>
        <div className="split-pane-horizontal">
          <div className="instrument-section">
            {instruments.map((instrument, index) => {
              return (
                <Instrument
                  key={instrument.key}
                  index={index}
                  name={instrument.name}
                  steps={instrument.steps}
                  addNote={addNote}
                  removeNote={removeNote}
                  activeStep={activeStep}
                  editSampleModeValue={editSampleModeValue}
                  setEditSampleModeValue={setEditSampleModeValue}
                  triggerInstrument={triggerInstrument}
                  deleteInstrument={deleteInstrument}
                  toggleStepOn={toggleStepOn}
                  changeNoteValue={changeNoteValue}
                  noteValues={noteValues}
                />
              );
            })}
            <div className="plus">
              <FontAwesomeIcon
                className="plus-icon"
                icon={faPlus}
                onClick={() => addNewInstrument()}
              />
            </div>
          </div>
          <div className="mixer-section">
            {instruments.map((instrument, index) => {
              return (
                <MixerStrip
                  instrument={instrument.instrument}
                  panVol={instrument.panVol}
                  meter={instrument.meter}
                  key={instrument.key}
                  index={index}
                  changeVol={changeVol}
                  changePan={changePan}
                  activeStep={activeStep}
                  triggerInstrument={triggerInstrument}
                  playing={playing}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workstation;
