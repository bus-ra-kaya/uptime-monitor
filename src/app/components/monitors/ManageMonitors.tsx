'use client';

import { useState } from "react";
import AddNewMonitor from "./AddNewMonitor";
import Modal from "../Modal";
import Tooltip from "../common/Tooltip";
import { Plus } from "lucide-react";

type Props = {
  totalMonitors: number;
}

export default function ManageMonitors ({totalMonitors}: Props) {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className='wrapper p-4 flex-row justify-between min-w-200'>
        <div className="flex flex-col items-start">
          <span className="text-2xl mr-auto ml-4 mb-2">Monitors</span>
          <span className="text-fg-muted text-md mr-auto ml-4 mb-2">{totalMonitors} monitors in total</span>
        </div>
        <div className="flex gap-2">
          <Tooltip text='Add a new endpoint'>
            <button className="btn h-16" 
              onClick={() => setIsOpen(true)} 
              aria-label='Add a new endpoint'
            >
              Add a new endpoint
              <Plus aria-hidden='true' />
            </button>
          </Tooltip>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AddNewMonitor
          onSuccess={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
        />
      </Modal>
    </>
  )
}