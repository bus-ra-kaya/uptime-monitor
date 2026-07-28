'use client';

import { ReactNode, useState } from "react";
import Modal from "../Modal";

type Props = {
  cardContent: ReactNode;
  modalContent: ReactNode;
}

export default function MonitorCardClient({cardContent, modalContent }: Props) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div onClick={() => setIsOpen(true)} >
      {cardContent}
    </div>

    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {modalContent}
    </Modal>
    </>
  )
}