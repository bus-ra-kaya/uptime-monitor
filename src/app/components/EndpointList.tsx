import { endpoints } from "@/data";
import EndpointCard from "./EndpointCard";
import { Settings } from "lucide-react";

export default function EndpointList(){

  return (
    <>
    <div className="flex mb-2 justify-between">
        <div className="flex flex-col">
          <span className="text-faded text-xl mr-auto ml-4 mb-2">Endpoints</span>
          <span className="text-faded text-md mr-auto ml-4 mb-2">6 endpoints * checks every 60 seconds</span>
        </div>
        <div className="flex gap-2">
          <button className="btn px-4 py-0">+</button>
          <button className="btn px-4 py-0"><Settings /></button>
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