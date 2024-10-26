import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthToken } from "../../service/useAuthToken";
import { setVehicle } from "../../service/vehicleService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { QRCodeCanvas } from "qrcode.react";

function Add(props) {
  const onCloseclick = () => {
    props.setAddTrigger(false);
  };

  const [formData, setFormData] = useState({
    vehicleNumber: "",
    chassisNo: "",
    vehicleType: "",
    fuelType: "",
    contactNo: "",
  });

  const [qrCodeValue, setQrCodeValue] = useState("");
  const { vehicleNumber, chassisNo, vehicleType, fuelType, contactNo } =
    formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const token = useAuthToken();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (token) {
      const response = await setVehicle(token, formData);
      toast.success("Vehicle Added");

      // Extract the QR code value from the response
      const qrString = String(response.data.body)
        ?.split("QR Code generated: ")[1]
        ?.trim();
      setQrCodeValue(qrString); // Store the QR code value in state
    }
    navigate("/");
  };

  const handleDownload = () => {
    const canvas = document.getElementById("qrCodeCanvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    props.setAddTrigger(false);
  };

  return props.addTrigger ? (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm backdrop-brightness-75">
      <div className="relative w-11/12 bg-white p-3 md:w-[500px] flex flex-col items-center justify-start">
        <CloseIcon
          onClick={onCloseclick}
          className="absolute cursor-pointer right-5 top-5"
        />
        <h1 className="mt-10 text-2xl font-extrabold text-orange-600 ">
          Add Vehicle
        </h1>

        <div className="p-5 my-10">
          <div className="flex items-center justify-between w-full p-3 my-3 mt-5 border-2 rounded-md">
            <input
              id="vehicleNumber"
              name="vehicleNumber"
              value={vehicleNumber}
              onChange={onChange}
              placeholder="Vehicle Number"
              className="w-full p-1 mr-2 outline-none"
              type="text"
              autoComplete="off"
            />
          </div>

          <div className="flex items-center justify-between w-full p-3 my-3 mt-5 border-2 rounded-md">
            <input
              id="chassisNo"
              name="chassisNo"
              value={chassisNo}
              onChange={onChange}
              placeholder="Chassi Number"
              className="w-full p-1 mr-2 outline-none"
              type="text"
              autoComplete="off"
            />
          </div>

          <div className="flex items-center w-full p-3 my-3 border-2 rounded-md">
            <select
              name="vehicleType"
              value={vehicleType}
              onChange={onChange}
              className="w-full p-1 outline-none"
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="CAR">CAR</option>
              <option value="BIKE">BIKE</option>
              <option value="LORRY">LORRY</option>
              <option value="BUS">BUS</option>
            </select>
          </div>

          <div className="flex items-center w-full p-3 mb-5 border-2 rounded-md">
            <select
              name="fuelType"
              value={fuelType}
              onChange={onChange}
              className="w-full p-1 outline-none"
            >
              <option value="" disabled>
                Select Fuel Type
              </option>
              <option value="DIESEL">DIESEL</option>
              <option value="PETROL">PETROL</option>
              <option value="KEROSINE">KEROSINE</option>
            </select>
          </div>

          <div className="flex items-center justify-between w-full p-3 my-3 mt-5 border-2 rounded-md">
            <input
              id="contactNo"
              name="contactNo"
              value={contactNo}
              onChange={onChange}
              placeholder="Contact Number"
              className="w-full p-1 mr-2 outline-none"
              type="text"
              autoComplete="off"
            />
          </div>
          <button className="mb-5 capitalize btn" onClick={handleClick}>
            add
          </button>

          {/* Conditionally render QR Code and download button after generating QR code */}
          {qrCodeValue && (
            <div className="flex flex-col items-center mt-5">
              <QRCodeCanvas id="qrCodeCanvas" value={qrCodeValue} size={200} />
              <button className="mt-3 capitalize btn" onClick={handleDownload}>
                download QR code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Add;
