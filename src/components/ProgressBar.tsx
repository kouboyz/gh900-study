type Props = {
  value: number   // 0–100
  weak?: boolean
  thin?: boolean
}

export function ProgressBar({ value, weak = false, thin = false }: Props) {
  return (
    <div className={`${thin ? 'h-0.5' : 'h-1'} bg-gray-100 rounded-full overflow-hidden`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${weak ? 'bg-red-400' : 'bg-gray-900'}`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
