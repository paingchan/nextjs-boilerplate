"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [kyat, setKyat] = useState(""); // Start as an empty string for better user input handling
  const [baht, setBaht] = useState("");
  const [conversionMode, setConversionMode] = useState("kyat-to-baht");
  const [showQRCodeModal, setShowQRCodeModal] = useState(false); // State to control modal visibility
  const exchangeRate = 750 / 100000; // Updated exchange rate: 100000 Kyat = 750 Baht

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (conversionMode === "kyat-to-baht") {
      setKyat(value);
      const numericValue = parseFloat(value);
      setBaht(numericValue ? (numericValue * exchangeRate).toFixed(2) : "");
    } else {
      setBaht(value);
      const numericValue = parseFloat(value);
      setKyat(numericValue ? (numericValue / exchangeRate).toFixed(2) : "");
    }
  };

  // Bank details (example, replace with your actual bank details)
  const bankDetails = "Bank Name: MyBank\nAccount Number: 1234567890\nAccount Name: John Doe";

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans bg-gray-100">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-blue-600">ချမ်းမြတ်&apos;s Exchange</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setConversionMode("kyat-to-baht")}
            className={`p-3 rounded-lg transition-colors ${conversionMode === "kyat-to-baht" ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-blue-200"}`}
          >
            ကျပ် to ဘတ်
          </button>
          <button
            onClick={() => setConversionMode("baht-to-kyat")}
            className={`p-3 rounded-lg transition-colors ${conversionMode === "baht-to-kyat" ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-blue-200"}`}
          >
            ဘတ် to ကျပ်
          </button>
        </div>

        {/* Today's Exchange Rate */}
        <div className="mt-4 text-lg font-medium text-gray-700">
          <p>Today's Exchange Rate:</p>
          <p className="text-xl font-semibold text-green-500">
            100,000 Kyat = 750 Baht
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col">
            <label htmlFor="input" className="text-lg font-medium text-gray-700">
              {conversionMode === "kyat-to-baht" ? "ကျပ် (MMK):" : "Baht (THB):"}
            </label>
            <input
              id="input"
              type="text"
              value={conversionMode === "kyat-to-baht" ? kyat : baht}
              onChange={handleInputChange}
              className="border-2 border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder={`Enter amount in ${conversionMode === "kyat-to-baht" ? "Kyat" : "Baht"}`}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="output" className="text-lg font-medium text-gray-700">
              {conversionMode === "kyat-to-baht" ? "ဘတ် (THB):" : "Kyat (MMK):"}
            </label>
            <input
              id="output"
              type="text"
              value={conversionMode === "kyat-to-baht" ? baht : kyat}
              readOnly
              className="border-2 border-gray-300 rounded-lg p-3 text-gray-800 bg-gray-200 cursor-not-allowed"
              placeholder="Result"
            />
          </div>
        </div>

        <button
          onClick={() => setShowQRCodeModal(true)} // Show QR code modal
          className="mt-6 p-3 bg-green-500 text-white rounded-lg transition-colors hover:bg-green-600"
        >
          ငွေလဲမယ်
        </button>
      </main>

      {/* Modal for QR Code and Bank Info */}
      {showQRCodeModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bank Information</h2>
            <p className="text-lg text-gray-700 mb-4">{bankDetails}</p>
            <div className="flex justify-center mb-4">
              <Image
                src="/images/bank-qr.png" // Path to the QR code image in the public folder
                alt="Bank QR Code"
                width={256}
                height={256}
              />
            </div>
            <button
              onClick={() => setShowQRCodeModal(false)} // Close modal
              className="p-2 bg-red-500 text-white rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
