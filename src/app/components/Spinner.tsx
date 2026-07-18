type Props = {
  size?: number;
}

export default function Spinner ({size = 32}: Props) {

  return (
    <div
      role='status'
      aria-label="loading"
      className={`animate-spin rounded-full border-2 border-gray-500 border-t-accent`}
      style={{width: size, height: size, animationDuration: '0.75s'}}>
      <span className="sr-only">Loading</span>
    </div>
  ) 
}