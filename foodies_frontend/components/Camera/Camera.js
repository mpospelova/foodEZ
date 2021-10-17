import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Camera.module.css";
import Webcam from "react-webcam";

const Camera = ({ onCapture }) => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 2,
    height: 2,
  });

  // only execute all the code below in client side
  // Handler to call on window resize
  function handleResize() {
    // Set window width/height to state
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  useEffect(() => {
    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  const videoConstraints = {
    facingMode: "environment",
  };

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (onCapture) {
      onCapture(imageSrc);
    }
  }, [webcamRef]);
  return (
    <>
      <div className={styles.WebcamContainer}>
        <Webcam
          className={styles.WebCamCanvas}
          audio={false}
          height={windowSize.width * 0.8}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={windowSize.height * 0.8}
          videoConstraints={videoConstraints}
        />
        <button className={styles.WebcamCaptureButton} onClick={capture}>
          Capture photo
        </button>
      </div>
    </>
  );
};

export default Camera;
