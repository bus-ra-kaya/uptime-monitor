import { endpoints } from "@/data";
import EndpointCard from "./EndpointCard";
import { LensConcave, Settings, } from "lucide-react";
import Tooltip from "./common/Tooltip";

export default function EndpointList(){

  return (
    <>
      <div className='flex justify-between items-center w-200 p-4 '>
        <div className="flex flex-col">
          <span className="text-primary text-xl mr-auto ml-4 mb-2">Endpoints</span>
          <span className="text-secondary text-md mr-auto ml-4 mb-2">6 endpoints * checks every 60 seconds</span>
        </div>
        <div className="flex gap-2">
          <Tooltip text='Add a new endpoint'>
            <button className="btn h-16 w-16">+</button>
          </Tooltip>
          <Tooltip text='Settings'>
            <button className="btn h-16 w-16">
              <Settings size='16' color="white"/>
            </button>
          </Tooltip>
        </div>
      </div>
      <div>
      {endpoints.map((endpoint) => (
        <EndpointCard 
          key={endpoint.url} 
          name={endpoint.name} 
          url={endpoint.url}
          status={endpoint.status}
          uptime={endpoint.uptime}
          latency={endpoint.latency}
        />
      ))}
      </div>
    </>
  )
}