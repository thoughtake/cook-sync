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
import clsx from "clsx";

const Modal = () => {
  const { closeModal, contents, setContentRef } = useModal();



  return (
    <>
      {contents.length > 0 &&
        contents.map((content, index) => {
          return (
            <Dialog
              key={index}
              open={true}
              onOpenChange={(open) => !open && closeModal()}
            >
              <DialogPortal>
                <DialogOverlay
                  className={clsx(
                    "fixed inset-0 bg-black/50 overflow-y-scroll"
                  )}
                  style={{ zIndex: 50 + index * 2 }}
                />
                <DialogContent
                  ref={(el) => setContentRef(index, el)}
                  className={clsx(
                    "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded w-940 max-w-[940px] mx-auto outline-primary outline-3 max-h-[90vh] overflow-auto"
                  )}
                  style={{ zIndex: 51 + index * 2 }}
                >
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
        })}
    </>
  );
};

export default Modal;
