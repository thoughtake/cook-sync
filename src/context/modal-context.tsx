"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ContextType = {
  showModal: (content: ReactNode) => void;
  closeModal: () => void;
  closeModalAll: () => void;
  contents: ReactNode[];
};

const ModalContext = createContext<ContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [contents, setContents] = useState<ReactNode[]>([]);

  const showModal = (content: ReactNode) => {
    setContents((prev) => [...prev, content]);
  };

  const closeModal = () => {
    setContents((prev) => prev.slice(0, -1));
  };

  const closeModalAll = () => {
    setContents([]);
  }

  return (
    <ModalContext.Provider
      value={{ showModal, closeModal, closeModalAll, contents }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModalがModalProviderの中で使われていません");
  return context;
};
