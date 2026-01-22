interface ButtonProps {
  children: React.ReactNode
  size?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  style?: string
}

export default function Button({
  children,
  size = 'md',
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  style = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${style} ${size} ${className} `}
    >
      {children}
    </button>
  )
}
