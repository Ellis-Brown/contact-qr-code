'use client';
import React, { useState } from "react";
import QRCode from "react-qr-code";
import VCard from "vcard-creator";

const QRCodePage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [qrCode, setQrCode] = useState("");
  const qrCodeRef = React.useRef<HTMLCanvasElement>(null);


  const generateQRCode = () => {
    
    const vCard = new VCard()
      .addName(lastName, firstName)
      .addEmail(email)
      .addAddress("", "", address)
      .addPhoneNumber(phoneNumber)
      .addURL(website);

    return vCard.toString();

  };

  const handleDownload = () => {
    if (qrCodeRef.current) {
      const qrCodeCanvas = qrCodeRef.current;
      const qrCodeImage = qrCodeCanvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = qrCodeImage;
      downloadLink.download = "qrcode.png";
      downloadLink.click();
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white">
        <h1 className="text-3xl mb-6 font-bold text-center bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
          Share your contact with a QR code
        </h1>
        <form className="mb-4">
          <div className="mb-2">
            <label htmlFor="firstName" className="block text-lg font-bold">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="lastName" className="block text-lg font-bold">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-lg font-bold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="address" className="block text-lg font-bold">
              Address:
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phoneNumber" className="block text-lg font-bold">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="website" className="block text-lg font-bold">
              Website:
            </label>
            <input
              type="url"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none"
            />
          </div>
          {/* center the below line */}
        </form>
        <div className="text-center">
          <h2 className="text-2xl mb-2 font-bold">QR Code:</h2>
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 w-60 h-60 rounded-lg mx-auto flex items-center justify-center"
          >
            <QRCode value={generateQRCode()} size={250} />
          </div>
          <button
            className="mt-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownload}
          >
            Download QR Code
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default QRCodePage;
