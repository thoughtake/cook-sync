'use client'

import { createContext, ReactNode, useContext, useState } from "react";

type ContextType = {
  showModal: (content: ReactNode) => void;
  closeModal: () => void;
  content: ReactNode | null;
  isOpen: boolean;
}

const ModalContext = createContext<ContextType | undefined>(undefined);

export const ModalProvider = ({children}: {children: ReactNode}) => {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const showModal = (content: ReactNode) => {
    setContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  }

  return (
    <ModalContext.Provider value={{showModal, closeModal, content, isOpen}}>
      {children}
    </ModalContext.Provider>
  )
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModalがModalProviderの中で使われていません");
  return context;
}