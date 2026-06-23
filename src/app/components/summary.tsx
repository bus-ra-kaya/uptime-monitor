export default function RecentSummary (){

  return (
    <div className="px-6 py-10 flex gap-2 rounded-md">
        <button className="btn flex-col text-faded">
          Total up
          <span className="text-xl text-emerald-600">5/6</span>
        </button>
        <button className="btn flex-col text-faded">
          Avg Latency
          <span className="text-xl text-emerald-600">214ms</span>
        </button>
        <button className="btn flex-col text-faded">
          Avg Uptime
          <span className="text-xl text-emerald-600">99.4%</span>
        </button>
        <button className="btn flex-col text-faded">
          Recent Incidents
          <span className="text-xl text-emerald-600">2</span>
        </button>
      </div>
  )
}