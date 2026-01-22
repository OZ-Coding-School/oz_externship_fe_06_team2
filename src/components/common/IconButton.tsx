interface IconButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  style?: string
}

export default function IconButton({
  children,
  onClick,
  className = '',
  style = '',
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`icon_button ${style} ${className} `}
    >
      {children}
    </button>
  )
}
