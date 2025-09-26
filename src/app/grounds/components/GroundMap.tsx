"use client";
import React from "react";

type MapProps = {
  lat: number;
  lng: number;
};

export default function GroundMap({ lat, lng }: MapProps) {
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBfvIZsTphjvYd29lYG_WFbWj2KaG6H_bU&q=${lat},${lng}&zoom=18&maptype=satellite`;

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
