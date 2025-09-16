"use client";

import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";

interface ModalProps {
  width?: string;
  formtype?: string;
  isVisible: boolean;
  onClose: () => void;
  hidePadding?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  width = "max-w-[95%] lg:max-w-4/5",
  formtype,
  isVisible,
  onClose,
  children,
  hidePadding,
}) => {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-[1001]">
      <div className="fixed inset-0 bg-black/10 backdrop-blur-lg bg-opacity-10"></div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl z-10 relative ${width}`}
      >
        <div className="bg-white overflow-scroll no-scrollbar max-h-[90vh] rounded-xl">
          <p className="w-full flex justify-between items-center p-4 pb-0">
            <span className="text-xl text-primary uppercase font-bold">
              {formtype}
            </span>
            <RxCross1
              size={24}
              className="cursor-pointer z-30 fixed top-2 right-2 text-primary"
              onClick={onClose}
            />
          </p>
          <div
            onClick={(e) => e.stopPropagation()}
            className={hidePadding ? "" : "p-4"}
          >
            {children}
          </div>
        </div>
      </motion.div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
