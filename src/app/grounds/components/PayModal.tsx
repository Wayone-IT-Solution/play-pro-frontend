"use client";
import SportsBookingModal from "@/components/home/SlotSelection";
import Modal from "@/components/modals/Modal";
import { useState } from "react";

const PayModal = () => {
  const [payModal, setPayModel] = useState(false);

  const handleCloseModal = () => {
    setPayModel(false);
  };
  return (
    <div>
      {/* Pay Now Button */}
      <button
        onClick={() => setPayModel(true)}
        className="w-full cursor-pointer py-4 rounded-full text-white font-medium text-lg"
        style={{ backgroundColor: "#013F5E" }}
      >
        Pay Now
      </button>
      <Modal
        width="w-4/5"
        hidePadding
        isVisible={payModal}
        onClose={handleCloseModal}
      >
        <SportsBookingModal />
      </Modal>
    </div>
  );
};

export default PayModal;
