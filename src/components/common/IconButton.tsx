interface IconButtonProps {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
  style?: string
}

export default function IconButton({
  children,
  onClick,
  type = 'button',
  className = '',
  style = '',
}: IconButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`icon_button ${style} ${className} `}
    >
      {children}
    </button>
  )
}
