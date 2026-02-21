import { type ButtonHTMLAttributes } from 'react'

const variantStyles = {
  primary:
    'px-4 py-2 bg-green-700 text-white rounded font-medium hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed',
  secondary:
    'px-4 py-2 bg-gray-200 text-gray-700 rounded font-medium hover:bg-gray-300',
  danger:
    'px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-500',
  icon: 'rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold transition-opacity duration-300 hover:bg-gray-200 hover:opacity-80'
} as const

export type ButtonVariant = keyof typeof variantStyles

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: React.ReactNode
}

function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const base = variantStyles[variant]
  const classes = className ? `${base} ${className}` : base

  return (
    <button className={classes} type="button" {...rest}>
      {children}
    </button>
  )
}

export default Button
