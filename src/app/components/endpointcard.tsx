import { Circle, LineChart } from "lucide-react";

type Props = {
  name: string;
  url: string;
  status: "UP" | "DOWN" | "SLOW",
  graph?: string;
  latency: string;
  uptime: string;
}

export default function EndpointCard({name, url, status, graph, latency, uptime}: Props){


  return (
    <div className="border px-20 py-6 rounded-xl mb-4 flex gap-4 items-center justify-between">
      <Circle color="green" size="20" fill="green" />
      <div className="flex flex-col justify-center w-80 min-w-40">
        <span className="text-lg font-bold">{name}</span>
        <span>{url}</span>
      </div>

      <button className="btn w-20">{status}</button>

      <span className="w-20">{latency}</span>
      <span>{uptime}</span>
    </div>
  )
}