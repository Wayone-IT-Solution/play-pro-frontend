"use client";

import React from "react";
import Image from "next/image";

const CenterImagePage: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="px-16 py-10">
        <Image
          src="/assets/camp.png"
          alt="Training Camp"
          width={1380}
          height={469}
          style={{ opacity: 1 }}
        />
      </div>
    </div>
  );
};

export default CenterImagePage;
