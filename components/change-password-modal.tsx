"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Eye, EyeOff, KeyRound, ShieldCheck, X, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChangePasswordModalProps {
  open: boolean
  onClose: () => void
  userEmail?: string
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 8 characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Lowercase letter", pass: /[a-z]/.test(password) },
    { label: "Number", pass: /\d/.test(password) },
    { label: "Special character", pass: /[^A-Za-z0-9]/.test(password) },
  ]
  const score = checks.filter((c) => c.pass).length

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"][score]
  const strengthColor = [
    "",
    "bg-destructive",
    "bg-warning",
    "bg-warning",
    "bg-success",
    "bg-success",
  ][score]

  if (!password) return null

  return (
    <div className="space-y-2 mt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              i <= score ? strengthColor : "bg-muted"
            )}
          />
        ))}
      </div>
      <p className={cn("text-xs font-medium", score <= 2 ? "text-destructive" : score <= 3 ? "text-warning" : "text-success")}>
        {strengthLabel}
      </p>
      <ul className="space-y-1">
        {checks.map((c) => (
          <li key={c.label} className={cn("flex items-center gap-1.5 text-xs", c.pass ? "text-success" : "text-muted-foreground")}>
            <CheckCircle2 className={cn("w-3 h-3", c.pass ? "text-success" : "text-muted-foreground/40")} />
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ChangePasswordModal({ open, onClose, userEmail }: ChangePasswordModalProps) {
  const [current, setCurrent] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const mismatch = confirm.length > 0 && newPass !== confirm

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (!current) { setErrorMsg("Please enter your current password."); return }
    if (newPass.length < 8) { setErrorMsg("New password must be at least 8 characters."); return }
    if (newPass !== confirm) { setErrorMsg("New passwords do not match."); return }
    if (current === newPass) { setErrorMsg("New password must be different from current password."); return }

    setStatus("loading")
    // Simulate API call
    setTimeout(() => {
      setStatus("success")
      setTimeout(() => {
        setStatus("idle")
        setCurrent("")
        setNewPass("")
        setConfirm("")
        onClose()
      }, 1800)
    }, 1200)
  }

  const handleClose = () => {
    if (status === "loading") return
    setStatus("idle")
    setErrorMsg("")
    setCurrent("")
    setNewPass("")
    setConfirm("")
    onClose()
  }

  if (!open) return null
  if (!mounted) return null

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <KeyRound className="w-4.5 h-4.5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Change Password</h2>
              {userEmail && <p className="text-xs text-muted-foreground">{userEmail}</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={status === "loading"}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success state */}
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Password Updated!</h3>
            <p className="text-sm text-muted-foreground">Your password has been changed successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Error message */}
            {errorMsg && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errorMsg}
              </div>
            )}

            {/* Current password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <PasswordStrength password={newPass} />
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter new password"
                  className={cn(
                    "w-full bg-background border rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 transition-all",
                    mismatch
                      ? "border-destructive focus:ring-destructive/30"
                      : "border-border focus:ring-ring"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {mismatch && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Passwords do not match
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={handleClose} disabled={status === "loading"}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={status === "loading" || mismatch}>
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Updating...
                  </span>
                ) : (
                  "Update Password"
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
