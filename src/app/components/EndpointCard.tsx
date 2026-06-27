import { Circle, LineChart } from "lucide-react";

type Props = {
  name: string;
  url: string;
  status: "up" | "down" | "slow",
  graph?: string;
  latency: string;
  uptime: string;
}

export default function EndpointCard({name, url, status, graph, latency, uptime}: Props){

  const statusColor = {
    up: 'green',
    slow: 'red',
    down: 'orange',
  };

  const colorCodes = {
  up: "bg-green-100 text-green-600 border-green-700",
  down: "bg-red-100 text-red-600 border-red-700",
  slow: "bg-orange-100 text-orange-600 border-orange-700",
};

  return (
    <div className="border border-slate-600 bg-slate-100 px-20 py-6 rounded-xl mb-4 flex gap-4 items-center justify-between">
      <Circle color={statusColor[status]} size="20" fill={statusColor[status]} />
      <div className="flex flex-col justify-center w-80 min-w-40">
        <span className="text-lg font-bold">{name}</span>
        <span className="text-faded">{url}</span>
      </div>

      <button className={`rounded-2xl btn w-20 text-sm ${colorCodes[status]}`}>{status.toUpperCase()}</button>

      <span className="w-20">{latency}</span>
      <span>{uptime}</span>
    </div>
  )
}