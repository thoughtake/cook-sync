"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ContextType = {
  showModal: (content: ReactNode) => void;
  closeModal: () => void;
  contents: ReactNode[];
  // content: ReactNode | null;
  // isOpen: boolean;
};

const ModalContext = createContext<ContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  // const [content, setContent] = useState<ReactNode | null>(null);
  // const [isOpen, setIsOpen] = useState(false);
  const [contents, setContents] = useState<ReactNode[]>([]);

  const showModal = (content: ReactNode) => {
    setContents((prev) => [...prev, content]);
    // setContent(content);
    // setIsOpen(true);
  };

  const closeModal = () => {
    // setIsOpen(false);
    // setContent(null);
    setContents((prev) => prev.slice(0, -1));
  };

  return (
    <ModalContext.Provider
      value={{ showModal, closeModal, contents: contents }}
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
