import React from "react";
import './WarningBanner.css'

const WarningBanner = ({ hideWarning }) => {
  return (
    <div className="warningbanner">
      <p className="warning-text">
        This site is not made for devices with this small screen, it will
        probably look like a mess...
      </p>
      
      <div className="hide-warning" onClick={hideWarning}>X</div>
    </div>
  );
};

export default WarningBanner;
