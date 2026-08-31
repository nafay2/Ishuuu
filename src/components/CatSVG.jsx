export default function CatSVG({ className = '', size = 90 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="60" rx="30" ry="26" fill="#f3bc3a" opacity="0.9" />
      <path d="M25 40 L15 15 L38 32 Z" fill="#f3bc3a" opacity="0.9" />
      <path d="M75 40 L85 15 L62 32 Z" fill="#f3bc3a" opacity="0.9" />
      <path d="M25 40 L20 22 L34 33 Z" fill="#ffd3e0" />
      <path d="M75 40 L80 22 L66 33 Z" fill="#ffd3e0" />
      <circle cx="38" cy="55" r="4.5" fill="#122b1c" />
      <circle cx="62" cy="55" r="4.5" fill="#122b1c" />
      <path d="M46 64 Q50 68 54 64" stroke="#122b1c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M30 63 L18 60 M30 66 L17 66 M30 69 L19 72" stroke="#7a5a10" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M70 63 L82 60 M70 66 L83 66 M70 69 L81 72" stroke="#7a5a10" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="34" cy="60" r="4" fill="#ffb3cb" opacity="0.7" />
      <circle cx="66" cy="60" r="4" fill="#ffb3cb" opacity="0.7" />
    </svg>
  )
}
