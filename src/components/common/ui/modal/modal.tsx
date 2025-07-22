"use client";

import { X } from "lucide-react";
import { useModal } from "../../../context/modal-context";
import { useCallback, useEffect, useRef } from "react";

const Modal = () => {
  const { isOpen, closeModal, content } = useModal();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleClose = useCallback(() => {
    modalRef.current?.close();
    closeModal();
  }, [closeModal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen && modalRef.current && !modalRef.current.open) {
      modalRef.current.showModal();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 w-full h-full"
      onClick={handleClose}
    >
      <div
        className="bg-white p-6 rounded w-full max-w-[940px] mx-auto outline-primary outline-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-right">
          <button onClick={closeModal} className="cursor-pointer">
            <X />
          </button>
        </div>
        {content}
      </div>
    </dialog>
  );
};

export default Modal;
