import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "gold";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-white text-black hover:bg-white/90",
      gold: "bg-[#C9A84C] text-black font-medium hover:bg-[#b8963e] transition-colors",
      outline: "border border-white/40 text-white hover:border-white hover:bg-white/5 transition-colors",
      ghost: "text-white/70 hover:text-white hover:bg-white/5 transition-colors",
      link: "text-[#C9A84C] underline-offset-4 hover:underline",
    }
    const sizes = {
      default: "h-11 px-6 py-2 text-sm",
      sm: "h-9 px-4 text-xs",
      lg: "h-13 px-10 py-3 text-base",
      icon: "h-10 w-10",
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A84C] disabled:pointer-events-none disabled:opacity-50 tracking-wide",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
