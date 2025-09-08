"use client";

import Link from "next/link";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState, useRef } from "react";

const ThankYouPage: React.FC = () => {
  const [bookingId, setBookingId] = useState<string | null>(null);
  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const bookingDataStr = localStorage.getItem("bookingData");
      if (bookingDataStr) {
        try {
          const bookingData = JSON.parse(bookingDataStr);
          setBookingId(bookingData._id || bookingData.groundId || "N/A");
        } catch {
          setBookingId("N/A");
        }
      } else {
        setBookingId("N/A");
      }
    }
  }, []);

  // Download QR Code
  const downloadQRCode = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `booking_${bookingId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Share QR Code
  const shareQRCode = async () => {
    if (!navigator.canShare || !qrRef.current) {
      alert("Sharing not supported on this browser");
      return;
    }
    try {
      const canvas = qrRef.current;
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve)
      );
      if (!blob) throw new Error("Could not get Blob from canvas");
      const file = new File([blob], `booking_${bookingId}.png`, {
        type: "image/png",
      });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Booking QR Code",
          text: `Booking ID: ${bookingId}`,
          files: [file],
        });
      } else {
        alert("This device does not support sharing files.");
      }
    } catch (error) {
      alert("Sharing failed: " + (error as Error).message);
    }
  };

  return (
    <div className="p-6 mt-24 w-full">
      <div className="bg-white flex flex-col md:flex-row gap-10 shadow-2xl max-w-4xl mx-auto w-full justify-center items-center p-4 lg:p-10 rounded-3xl">
        <div className="rounded-3xl text-center relative">
          {/* Thank You Image */}
          <div className="mb-8 mt-4">
            <Image
              src="/assets/thankyou.png"
              alt="Thank You"
              width={400}
              height={120}
              className="w-full max-w-sm mx-auto"
              priority
            />
          </div>

          {/* Text */}
          <p className="text-[#6D0E82] text-base mb-6 leading-relaxed px-6">
            Congratulations! You’ve successfully booked your <br />
            slot. We’ll see you soon.
          </p>

          {/* Booking ID */}
          <p className="text-black text-lg font-semibold select-text break-all mb-6">
            Booking ID: {bookingId || "Loading..."}
          </p>

          {/* Explore More */}
          <Link href="/history" passHref>
            <button
              className="bg-[#6D0E82] cursor-pointer text-white px-8 sm:px-16 py-3 sm:py-4 rounded-lg font-medium text-base hover:bg-opacity-90 transition-all duration-200 shadow-sm"
              type="button"
            >
              Explore More
            </button>
          </Link>
        </div>

        {/* QR Section */}
        <div className="flex flex-col bg-white items-center">
          <div className="p-4 bg-[#6D0E82] rounded-xl shadow-lg">
            {bookingId ? (
              <QRCodeCanvas
                ref={qrRef}
                value={bookingId}
                size={200}
                bgColor="#ffffff"
                fgColor="#6D0E82"
                level="H"
                includeMargin={false}
                className="rounded-lg"
              />
            ) : (
              <p className="text-white">Loading QR Code...</p>
            )}
          </div>

          {/* Buttons in flex row */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={downloadQRCode}
              className="bg-[#6D0E82] text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition"
              type="button"
            >
              Download QR
            </button>

            <button
              onClick={shareQRCode}
              className="bg-[#6D0E82] text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition"
              type="button"
            >
              Share QR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
