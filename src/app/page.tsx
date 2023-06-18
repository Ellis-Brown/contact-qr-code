'use client';
import React, { useState } from "react";
import QRCode from "react-qr-code";
import { saveAs } from 'file-saver';
import VCard from "vcard-creator";
import { AiFillGithub } from 'react-icons/ai';
import { toPng } from 'html-to-image';


export default function MainPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const ref = React.useRef(null);



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
    console.log('here');
    const qrCodeValue = generateQRCode();
    const canvas = ref?.current;
    if (canvas === null) {
      alert('500 server error');
      return;
    }
    toPng(canvas)
      .then(function (blob: any) {
        saveAs(blob, 'contact-qr-code.png');
      });
  }

  return (

    <div className="bg-gradient-to-r from-green-500 to-blue-500 min-h-screen flex items-center justify-center flex-col">
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
        </form>
        <div className="text-center">
          <h2 className="text-2xl mb-2 font-bold">QR Code:</h2>
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-60 h-60 rounded-lg mx-auto flex items-center justify-center selectMeClassName">
            <QRCode ref={ref} value={generateQRCode()} size={220} id={'canvas'} />
          </div>
          <button
            className="mt-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownload}

          >
            Download QR Code
          </button>
        </div>
      </div>

      <a
        href={'https://github.com/Ellis-Brown/contact-qr-code'}
        className="text-gray-200 rounded-lg bg-gradient-to-r from-black to-gray-500 hover:bg-gray-600 px-4 py-2 my-4"
      >
        <div className="flex flex-row">
          <AiFillGithub size={30} />&nbsp; Star on GitHub
        </div>
      </a>
    </div>

  );
};