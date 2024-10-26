import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "../service/useAuthToken";
import { sendAnOtp } from "../service/resourceService";

function Verify() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  const token = useAuthToken();

  const sendOtp = async () => {
    await sendAnOtp(token);
  };

  useEffect(() => {
    sendOtp();
  }, []);

  const onClick = async () => {
    // await axios.post(
    //   `http://localhost:8081/api/resource/otp/verify?otp=${otp}`
    // );
    navigate("/");
  };

  return (
    <div className="m-10">
      <h1 className="capitalize btn_main w-fit" onClick={() => navigate("/")}>
        home
      </h1>
      <h1 className="text-xl font-extrabold uppercase">Verify your account</h1>

      <h2 className="my-5">
        We have sent you a
        <span className="ml-1 text-sm font-extrabold tracking-wide uppercase">
          otp
        </span>
      </h2>

      <div className="otp">
        <input
          type="text"
          maxLength="6"
          value={otp}
          onChange={handleOtpChange}
          placeholder="Enter OTP"
          className="w-[50%] p-2 tracking-widest text-center border-2 rounded-md outline-none"
          inputMode="numeric"
        />
      </div>

      <button onClick={onClick} className="w-[50%] btn_green mt-5 capitalize">
        verify
      </button>
    </div>
  );
}

export default Verify;
