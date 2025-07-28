"use client";

import { X } from "lucide-react";
import { useModal } from "../../../../context/modal-context";
import { Suspense } from "react";
import ModalLoading from "./modal-loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@radix-ui/react-dialog";

const Modal = () => {
  const { isOpen, closeModal, content } = useModal();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 overflow-y-scroll" />
        <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded w-940 max-w-[940px] mx-auto outline-primary outline-3 max-h-[90vh] overflow-auto">
          <div className="text-right">
            <button onClick={closeModal} className="cursor-pointer">
              <X />
            </button>
          </div>
          <DialogTitle className="hidden">モーダル</DialogTitle>
          <DialogDescription className="hidden">
            モーダルを表示しています。
          </DialogDescription>
          <Suspense fallback={<ModalLoading />}>{content}</Suspense>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default Modal;
