import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthToken } from "../service/useAuthToken";
import QR from "../components/popups/QR";
import { getAllVehicles, getQrString } from "../service/vehicleService";
import Add from "../components/popups/Add";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addPopup, setAddPopup] = useState(false);
  const [qrPopUp, setQrPopUp] = useState(false);

  const [vehicles, setVehicles] = useState();
  const [qrValue, setQrValue] = useState("");

  const fetchVehicles = async () => {
    if (token) {
      const response = await getAllVehicles(token);
      setVehicles(response.data);
      console.log(response.data);
    }
  };

  const fetchQrValue = async (vehi) => {
    if (token) {
      const response = await getQrString(token, vehi);
      setQrValue(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const token = useAuthToken();

  useEffect(() => {}, []);

  const onClick = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
    toast.success("User Logged Out !");
  };

  return (
    <div className="m-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold capitalize">fuel pass sytem</h1>
        <div className="flex items-center gap-4">
          <h1 onClick={onClick} className="capitalize btn_green">
            logout
          </h1>
        </div>
      </div>

      <button
        className="my-5 capitalize btn"
        onClick={() => {
          setAddPopup(true);
        }}
      >
        add vehicle
      </button>

      <div className="flex items-center justify-start">
        {vehicles &&
          vehicles.map((vehicle) => (
            <div className="flex flex-col items-center justify-center m-5 transition duration-300 ease-in-out bg-white rounded-lg shadow-lg cursor-pointer shadow-gray-500 h-44 w-44 hover:scale-105">
              <h1 className="text-xl font-extrabold tracking-wide uppercase">
                {vehicle.vehicleNumber}
              </h1>
              <button
                className="mt-10 btn_delete"
                onClick={() => {
                  setQrPopUp(true);
                  setQrValue(fetchQrValue(vehicle.vehicleNumber));
                }}
              >
                reset QR code
              </button>
            </div>
          ))}
      </div>

      <QR
        addTrigger={qrPopUp}
        setAddTrigger={setQrPopUp}
        qrValue={qrValue}
      ></QR>

      <Add addTrigger={addPopup} setAddTrigger={setAddPopup}></Add>
    </div>
  );
}

export default Home;
