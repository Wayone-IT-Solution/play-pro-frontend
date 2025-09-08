"use client";
import React from "react";

type MapProps = {
  lat: number;
  lng: number;
};

export default function GroundMap({ lat, lng }: MapProps) {
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`;
  return (
    <div className="rounded-2xl overflow-hidden">
      <iframe
        src={mapSrc}
        width="100%"
        height="384"
        loading="lazy"
        allowFullScreen
        style={{ border: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
