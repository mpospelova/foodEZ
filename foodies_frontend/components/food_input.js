import { useState } from "react";
import Camera from "./Camera/Camera";

export default function FoodInputField({
  name,
  setName,
  quantity,
  setQuantity,
  unit,
  setUnit,
}) {
  const [cameraActive, setCameraActive] = useState(false);

  const toggleCameraActive = () => {
    setCameraActive(!cameraActive);
  };

  const handleCameraCapture = (capture) => {
    setCameraActive(false);
    setName("Apple");
    setQuantity(1);
    setUnit("pcs");
  };

  return (
    <>
      <form className="input_form">
        <div className="input_form-first-row">
          <input
            className="name_input"
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <img
            className="input_form-camera-icon"
            src="/camera.png"
            width="40"
            height="40"
            onClick={toggleCameraActive}
          />
        </div>

        <input
          className="quantity_input"
          type="number"
          value={quantity}
          placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />

        <select
          className="unit_input"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="Select">Select</option>
          <option value="pcs">pcs</option>
          <option value="kg">kg</option>
          <option value="liter">liter</option>
        </select>
      </form>

      {cameraActive && <Camera onCapture={handleCameraCapture} />}
    </>
  );
}
