"use client";

import { X } from "lucide-react";
import { useModal } from "../context/modal-context";
import { useEffect} from "react";

const Modal = () => {
  const { isOpen, closeModal, content } = useModal();
  

  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {

      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 w-full h-full"
      onClick={closeModal}
    >
      <dialog
        className="bg-white p-6 rounded w-full max-w-[940px] mx-auto outline-primary outline-3"
        open
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-right">
          <button onClick={closeModal} className="cursor-pointer">
            <X />
          </button>
        </div>
        {content}
      </dialog>
    </div>
  );
};

export default Modal;
