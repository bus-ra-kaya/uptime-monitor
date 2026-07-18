'use client';

import { useState } from "react";
import AddNewMonitor from "./AddNewMonitor";
import Modal from "./Modal";
import Tooltip from "./common/Tooltip";
import { Settings } from "lucide-react";

export default function ManageMonitors () {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className='wrapper p-4 flex-row justify-between w-full '>
        <div className="flex flex-col items-start">
          <span className="text-xl mr-auto ml-4 mb-2">Endpoints</span>
          <span className="text-fg-muted text-md mr-auto ml-4 mb-2">6 endpoints</span>
        </div>
        <div className="flex gap-2">
          <Tooltip text='Add a new endpoint'>
            <button className="btn h-16 w-16" 
              onClick={() => setIsOpen(true)} 
              aria-label='Add a new endpoint'
            >
              +
            </button>
          </Tooltip>
          <Tooltip text='Settings'>
            <button className="btn h-16 w-16">
              <Settings size='16' color="white"/>
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