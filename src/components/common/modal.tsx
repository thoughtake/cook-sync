'use client'

import { X } from "lucide-react";
import { useModal } from "../context/modal-context";

const Modal = () => {
  const {isOpen, closeModal, content} = useModal();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <dialog
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-100 h-199 "
        open
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={closeModal}>
          <X />
        </button>
        {content}
      </dialog>
    </div>    
  )
}

export default Modal;