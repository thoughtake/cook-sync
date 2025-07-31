"use client";

import { createContext, ReactNode, useContext, useRef, useState } from "react";

type ContextType = {
  showModal: (content: ReactNode) => void;
  closeModal: () => void;
  closeModalAll: () => void;
  contents: ReactNode[];
  setContentRef: (index: number, el: HTMLDivElement | null) => void;
  scrollTop: (index: number) => void;
};

const ModalContext = createContext<ContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [contents, setContents] = useState<ReactNode[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const showModal = (content: ReactNode) => {
    setContents((prev) => [...prev, content]);
  };

  const closeModal = () => {
    setContents((prev) => prev.slice(0, -1));
  };

  const closeModalAll = () => {
    setContents([]);
  }

  const setContentRef = (index: number, el: HTMLDivElement | null) => {
    contentRefs.current[index] = el;
  }

  const scrollTop = (index: number) => {
    contentRefs.current[index]?.scrollTo({top: 0, behavior: "auto"})
  }

  return (
    <ModalContext.Provider
      value={{ showModal, closeModal, closeModalAll, contents, setContentRef, scrollTop }}
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
