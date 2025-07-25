"use client";

import { X } from "lucide-react";
import { useModal } from "../../../../context/modal-context";
import { Suspense, useCallback, useEffect, useRef } from "react";
import ModalLoading from "./modal-loading";

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
      className="w-fit m-auto"
      onClick={handleClose}
    >
      <div
        className="bg-white p-8 rounded w-940 max-w-[940px] mx-auto outline-primary outline-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-right">
          <button onClick={closeModal} className="cursor-pointer">
            <X />
          </button>
        </div>
        <Suspense fallback={<ModalLoading />}>{content}</Suspense>
      </div>
    </dialog>
  );
};

export default Modal;
