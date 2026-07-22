type Props = {
  totalUp: number;
}

export default function Summary ({ totalUp }: Props){

  return (
    <div className="px-6 py-10 flex justify-center gap-2 rounded-md w-full ">
        <button className="btn flex-col px-10">
          Total up
          <span className="text-xl text-emerald-600">{totalUp}</span>
        </button>
        <button className="btn flex-col  px-10">
          Avg Latency
          <span className="text-xl text-emerald-600 px-10">214ms</span>
        </button>
        <button className="btn flex-col px-10">
          Avg Uptime
          <span className="text-xl text-emerald-600">99.4%</span>
        </button>
        <button className="btn flex-col px-10">
          Recent Incidents
          <span className="text-xl text-red-400">2</span>
        </button>
      </div>
  )
}