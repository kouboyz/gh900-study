type Props = {
  text: string
  layout?: 'row' | 'icon'
}

function openX(text: string) {
  const url = window.location.href
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer')
}

function openLine(text: string) {
  const url = window.location.href
  window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  )
}

export function ShareButtons({ text, layout = 'row' }: Props) {
  if (layout === 'icon') {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => openX(text)}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white hover:opacity-80 transition-opacity cursor-pointer"
          aria-label="X でシェア"
        >
          <XIcon />
        </button>
        <button
          onClick={() => openLine(text)}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#06C755] text-white hover:opacity-80 transition-opacity cursor-pointer"
          aria-label="LINE でシェア"
        >
          <LineIcon />
        </button>
      </div>
    )
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={() => openX(text)}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded bg-black text-white text-sm hover:opacity-80 transition-opacity cursor-pointer"
      >
        <XIcon />
        X でシェア
      </button>
      <button
        onClick={() => openLine(text)}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded bg-[#06C755] text-white text-sm hover:opacity-80 transition-opacity cursor-pointer"
      >
        <LineIcon />
        LINE でシェア
      </button>
    </div>
  )
}
