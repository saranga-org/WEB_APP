import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { QRCodeCanvas } from "qrcode.react"; // Use QRCodeCanvas
import { getQrString } from "../../service/vehicleService";
import { useAuthToken } from "../../service/useAuthToken";

function QR(props) {
  const onCloseclick = () => {
    props.setAddTrigger(false);
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const qrCodeValue = String(props.qrValue)?.split("New QR Code: ")[2]?.trim();

  return props.addTrigger ? (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm backdrop-brightness-75">
      <div className="relative w-11/12 bg-white p-3 md:w-[500px] flex flex-col items-center justify-start">
        <CloseIcon
          onClick={onCloseclick}
          className="absolute cursor-pointer right-5 top-5"
        />
        <h1 className="mt-10 text-2xl font-extrabold text-orange-600 ">
          QR code{" "}
        </h1>

        <div className="p-5 my-10 border-2 border-black">
          <QRCodeCanvas value={qrCodeValue} size={200} />{" "}
          {/* Use QRCodeCanvas */}
        </div>

        <button className="mb-5 capitalize btn" onClick={handleDownload}>
          download qR code
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default QR;
