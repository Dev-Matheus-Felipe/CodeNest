"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"

import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {

  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}

      toastOptions={{
      classNames: {
        toast: "!w-auto",
        success: "!bg-green-600",
        error: "!bg-red-500",
        warning: "!bg-[#ff5e00]"
      },
    }}
      style={
        {
          
          "--normal-bg": "var(--secondary-button-hover)",
          "--normal-text": "white",
          "--normal-border": "var(--border)",
          "--border-radius": "7px",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }