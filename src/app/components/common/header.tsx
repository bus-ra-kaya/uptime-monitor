export default function Header (){

  return (
    <nav className="flex items-center justify-between m-8">
      <h1 className="text-2xl bold text-blue-800 cursor-pointer hover:text-blue-900 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        Uptime Monitor
        </h1>
      <div>
        <button className="btn mr-2">
          Sign in
        </button>
        <button className="btn">
          Sign up
        </button>
      </div>
    </nav>
  )
}