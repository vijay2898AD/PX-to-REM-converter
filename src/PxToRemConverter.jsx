import React, { useState } from "react";
import "./PxToRemConverter.css";
import copyImg from "./assets/copy.png";

function PxToRemConverter() {
  const [rootSize, setRootSize] = useState(16);
  const [px, setPx] = useState("");
  const [rem, setRem] = useState("");
  const [lastEdited, setLastEdited] = useState('px');

  const handlePxChange = (e) => {
    const pxValue = e.target.value;
    setPx(pxValue);
    if (pxValue === "" || isNaN(pxValue)) {
      setRem("");
    } else {
      setRem((pxValue / rootSize).toFixed(3));
    }
    setLastEdited('px');
  };

  const handleRemChange = (e) => {
    const remValue = e.target.value;
    setRem(remValue);
    if (remValue === "" || isNaN(remValue)) {
      setPx("");
    } else {
      setPx((remValue * rootSize).toFixed(2));
    }
    setLastEdited('rem');
  };

  const handleRootSizeChange = (e) => {
    const newRoot = Number(e.target.value) || 1;
    setRootSize(newRoot);
    if (lastEdited === 'px' && px) {
        setRem((px / newRoot).toFixed(3));
    } else if (lastEdited === 'rem' && rem) {
        setPx((rem * newRoot).toFixed(2));
    }
  };

  const handleCopy = (value) => {
  if (value !== "") {
    navigator.clipboard.writeText(value.toString());
    alert(`Copied ${value} to clipboard!`);
  }
};

const handleSwap = () => {
  setPx(rem);
  setRem(px);
  setLastEdited(prev => prev === 'px' ? 'rem' : 'px');
}; 

  return (
    <div className="converter-wrapper">
      <div className="converter-container">
        <h1 className="converter-title">PX to REM converter</h1>
        
        <div className="input-section">
          <label className="input-label">Pixels</label>
          <div className="input-wrapper">
            <button
                type="button"
                className="copy-icon"
                onClick={() => handleCopy(px)}
                title="Copy"
                aria-label="Copy pixel value"
                disabled={px === ""}
            >
            <img src={copyImg} alt="Copy" className="copy-img" />
            </button>
            <input
              type="number"
              value={px}
              onChange={handlePxChange}
              className="converter-input"
              placeholder="10"
              step = "0.1"
            />
            <span className="unit-label">px</span>
          </div>
        </div>

        <button
          type="button"
          className="converter-arrow"
          onClick={handleSwap}
          aria-label="Swap values"
          title="Swap pixels with rem"
        >
        ↑↓
        </button>

        <div className="input-section">
          <label className="input-label">REM</label>
          <div className="input-wrapper">
            <button
                type="button"
                className="copy-icon"
                onClick={() => handleCopy(rem)}
                title="Copy"
                aria-label="Copy REM value"
                disabled={rem === ""}
            >
            <img src={copyImg} alt="Copy" className="copy-img" />
            </button>
            <input
              type="number"
              value={rem}
              onChange={handleRemChange}
              step="0.001"
              className="converter-input rem-input"
              placeholder="0.625"
            />
            <span className="unit-label">rem</span>
          </div>
        </div>

        <div className="footer-text">
          Calculation based on a root font-size of <input
            type="number"
            step="1"
            value={rootSize}
            onChange={handleRootSizeChange}
            className="root-size-input"
            aria-label="root font size"
        /> pixel.
        </div>
      </div>

      {/* Conversion Table */}
      <div className="conversion-table">
        <h3>PX ↔ REM conversion tables</h3>
        <div className="table-container">
          <div className="table-section">
            <h4>Pixels → REM</h4>
            <div className="table-row header">
              <span>Pixels</span>
              <span>REM</span>
            </div>
            {[1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 15, 16, 18, 20, 24, 25, 28, 32, 36, 40, 44, 48, 50, 56, 64, 72, 75, 80, 90, 100].map(pxVal => (
              <div key={pxVal} className="table-row">
                <span>{pxVal}px</span>
                <span>{(pxVal / rootSize).toFixed(pxVal < 10 ? 3 : 2)}rem</span>
              </div>
            ))}
          </div>

          <div className="table-section">
            <h4>REM → Pixels</h4>
            <div className="table-row header">
              <span>REM</span>
              <span>Pixels</span>
            </div>
            {[0.01, 0.03, 0.05, 0.08, 0.1, 0.15, 0.2, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 30, 40, 50, 60, 80, 100].map(remVal => (
              <div key={remVal} className="table-row">
                <span>{remVal}rem</span>
                <span>{(remVal * rootSize).toFixed(0)}px</span>
              </div>
            ))}
          </div>
        </div>

        <div className="converter-info">
          <h4>Convert pixels to REM</h4>
          <p>This calculator converts pixels to the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#Rem" target="_blank" style={{color: "#708090"}}>CSS unit REM</a>. The conversion is based on the default font-size of 16 pixel, but can be changed.</p>
          <p>With the CSS rem unit you can define a size relative to the font-size of the HTML root tag.</p>
          <p>The conversion works of course in both directions, just change the opposite input field.</p>
          
          <h4>An example</h4>
          <p>So if we take the default size as an example, than 1px represents 0.0625rem and, in the other direction, 1rem represents 16px.</p>
          
          <h4>EM vs. REM: The differences</h4>
          <p>Inside a single document, the length of a REM unit is everywhere the same, it can just differ between documents. EM on the other side can differ between every element, because it is relative to the elements own font-size (exception is the font-size itself, in it EM is relative to the parent).</p>
          <p>REM is the newer unit, older browsers don't support it.</p>
        </div>
      </div>
      <footer className="footer">
        <p>© 2025 Px to Rem converter. All rights reserved.</p>
        <p>Created with <p className="heart">&#10084;</p> by Vijay.</p>
      </footer>
    </div>
  );
}

export default PxToRemConverter;
