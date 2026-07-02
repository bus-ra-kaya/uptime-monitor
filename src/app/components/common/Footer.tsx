export default function Footer (){

  return (
    <div className="flex flex-col items-center justify-center p-6 border-t border-t-border-color w-full text-primary">
      <span> 
        <a href="https://github.com/bus-ra-kaya" target="_blank" rel="noopener noreferrer" className="cursor-pointer mr-2">
          • GitHub
        </a>
        <a href="https://www.linkedin.com/in/bus-ra-ka-ya/" target="_blank" rel="noopener noreferrer" className="cursor-pointer mr-2">
          • Linkedin
        </a>
        
        <a href="mailto:busrakaya.dev@gmail.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
          • Email
        </a>
     </span>
      <span className="text-sm"> © 2026 Uptime Monitor</span>
    </div>
  )
}