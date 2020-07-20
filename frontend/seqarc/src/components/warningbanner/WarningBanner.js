import React from "react";
import "./WarningBanner.css";
import ReactDOM from "react-dom";

const WarningBanner = ({ hideWarning, warningIsShowing }) => {
  return warningIsShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="warning-overlay" />
          <div
            className="warning-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="warning">
              <h3>Hello!</h3>
              <p>
                This site is not really made for mobile devices or devices with
                this small screen, so it will probably look like a mess and
                maybe not function exactly as intended...
              </p>
              <button
                type="button"
                className="warning-button"
                data-dismiss="warning"
                aria-label="Close"
                onClick={hideWarning}
              >
                Close
              </button>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default WarningBanner;
