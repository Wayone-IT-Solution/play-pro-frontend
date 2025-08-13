import Image from "next/image";
import React from "react";

const Comma = () => {
  return (
    <div className="flex space-x-1 items-center">
      <Image
        src={"/assets/comma.png"}
        alt="Comma"
        width={80}
        height={100}
        className="object-contain w-4"
      />
      <Image
        src={"/assets/comma.png"}
        alt="Comma"
        width={80}
        height={100}
        className="object-contain w-4"
      />
    </div>
  );
};

export default Comma;
