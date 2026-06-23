
import { endpoints } from "@/data";
import EndpointCard from "./components/endpointcard";
import RecentSummary from "./components/summary";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black w-full common-gradient">
     
      <RecentSummary />
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
    </div>
  );
}
