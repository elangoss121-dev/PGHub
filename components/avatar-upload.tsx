"use client"

import { useRef, useState } from "react"
import { Camera, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface AvatarUploadProps {
  src?: string
  fallback: string
  onChange: (dataUrl: string) => void
  size?: "sm" | "md" | "lg"
  className?: string
}

const SIZES = {
  sm: "h-16 w-16",
  md: "h-20 w-20",
  lg: "h-24 w-24",
}

export function AvatarUpload({ src, fallback, onChange, size = "md", className }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    // Accept any image format. Guard against very large files.
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.")
      return
    }

    setLoading(true)
    const reader = new FileReader()
    reader.onload = () => {
      onChange(reader.result as string)
      setLoading(false)
    }
    reader.onerror = () => {
      setError("Failed to read the image. Try again.")
      setLoading(false)
    }
    reader.readAsDataURL(file)
    // Reset so selecting the same file again re-triggers change
    e.target.value = ""
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative">
        <Avatar className={cn(SIZES[size], "border-2 border-primary/20")}>
          <AvatarImage src={src || undefined} alt="Profile photo" />
          <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">{fallback}</AvatarFallback>
        </Avatar>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label="Upload profile photo"
          className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-105"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
