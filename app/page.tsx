"use client"

import type React from "react"

import Image from "next/image"
import { useState, type FormEvent } from "react"
import {
  Car,
  CalendarDays,
  CreditCard,
  Flag,
  Hash,
  IdCard,
  MapPin,
  MessageCircle,
  Phone,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type FieldName =
  | "fullName"
  | "idPassport"
  | "dlNumber"
  | "citizenship"
  | "address"
  | "phoneNumber"
  | "vehicleName"
  | "carNumberPlate"
  | "numberOfDays"

export default function ClientDetails() {
  const [formData, setFormData] = useState<Record<FieldName, string>>({
    fullName: "",
    idPassport: "",
    dlNumber: "",
    citizenship: "",
    address: "",
    phoneNumber: "",
    vehicleName: "",
    carNumberPlate: "",
    numberOfDays: "",
  })

  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as FieldName]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<FieldName, string>> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.idPassport.trim()) newErrors.idPassport = "ID/Passport number is required"
    if (!formData.dlNumber.trim()) newErrors.dlNumber = "Driving license number is required"
    if (!formData.citizenship.trim()) newErrors.citizenship = "Citizenship is required"
    if (!formData.address.trim()) newErrors.address = "Residential address is required"
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"
    if (!formData.vehicleName.trim()) newErrors.vehicleName = "Vehicle name is required"
    if (!formData.carNumberPlate.trim()) newErrors.carNumberPlate = "Car number plate is required"
    if (!formData.numberOfDays.trim()) newErrors.numberOfDays = "Number of days is required"
    if (formData.numberOfDays && (parseInt(formData.numberOfDays) < 1 || parseInt(formData.numberOfDays) > 365)) {
      newErrors.numberOfDays = "Number of days must be between 1 and 365"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const submittedAt = new Date().toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    })

    // Format message for WhatsApp
    const message = [
      "🚗 *SHILAABO CAR HIRE*",
      "_New Booking — Client Details_",
      "━━━━━━━━━━━━━━━━━━━━",
      "",
      "👤 *Personal Details*",
      `• Full Name: ${formData.fullName}`,
      `• ID / Passport: ${formData.idPassport}`,
      `• Driving License: ${formData.dlNumber}`,
      `• Citizenship: ${formData.citizenship}`,
      `• Phone: ${formData.phoneNumber}`,
      `• Address: ${formData.address}`,
      "",
      "🔑 *Rental Details*",
      `• Vehicle: ${formData.vehicleName}`,
      `• Number Plate: ${formData.carNumberPlate}`,
      `• Duration: ${formData.numberOfDays} day(s)`,
      "",
      "━━━━━━━━━━━━━━━━━━━━",
      `🕒 Submitted: ${submittedAt}`,
    ].join("\n")

    const encodedMessage = encodeURIComponent(message)

    // WhatsApp number (format: country code + number, no + or spaces)
    const whatsappNumber = "254792837410"

    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center p-4 sm:p-6">
      {/* Decorative background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <Card className="relative w-full max-w-2xl border-border/60 shadow-2xl backdrop-blur-sm">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-primary/15 to-accent/15 p-1.5 ring-1 ring-border">
              <div className="rounded-full bg-background p-3">
                <Image
                  src="/logo.png"
                  alt="Shilaabo Car Hire"
                  width={96}
                  height={96}
                  priority
                  className="h-24 w-24 object-contain"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/20">
              <Car className="h-3.5 w-3.5" />
              Car Hire Booking
            </span>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-balance">Shilaabo Car Hire</CardTitle>
          <CardDescription className="text-base text-pretty">
            Fill in your details below and submit your booking directly via WhatsApp.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Details */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                </span>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">Personal Details</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  id="fullName"
                  label="Full Name"
                  placeholder="John Doe"
                  icon={<User className="h-4 w-4" />}
                  value={formData.fullName}
                  error={errors.fullName}
                  onChange={handleChange}
                />
                <FormField
                  id="idPassport"
                  label="ID / Passport Number"
                  placeholder="123456789"
                  icon={<IdCard className="h-4 w-4" />}
                  value={formData.idPassport}
                  error={errors.idPassport}
                  onChange={handleChange}
                />
                <FormField
                  id="dlNumber"
                  label="Driving License Number"
                  placeholder="DL123456"
                  icon={<CreditCard className="h-4 w-4" />}
                  value={formData.dlNumber}
                  error={errors.dlNumber}
                  onChange={handleChange}
                />
                <FormField
                  id="citizenship"
                  label="Citizenship"
                  placeholder="Kenya"
                  icon={<Flag className="h-4 w-4" />}
                  value={formData.citizenship}
                  error={errors.citizenship}
                  onChange={handleChange}
                />
                <FormField
                  id="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  placeholder="+254 792 837 410"
                  icon={<Phone className="h-4 w-4" />}
                  value={formData.phoneNumber}
                  error={errors.phoneNumber}
                  onChange={handleChange}
                />
                <FormField
                  id="address"
                  label="Residential Address"
                  placeholder="123 Main Street, Nairobi"
                  icon={<MapPin className="h-4 w-4" />}
                  value={formData.address}
                  error={errors.address}
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* Rental Details */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground">
                  <Car className="h-4 w-4" />
                </span>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">Rental Details</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  id="vehicleName"
                  label="Vehicle Name"
                  placeholder="Toyota Camry"
                  icon={<Car className="h-4 w-4" />}
                  value={formData.vehicleName}
                  error={errors.vehicleName}
                  onChange={handleChange}
                />
                <FormField
                  id="carNumberPlate"
                  label="Car Number Plate"
                  placeholder="KAB 123C"
                  icon={<Hash className="h-4 w-4" />}
                  value={formData.carNumberPlate}
                  error={errors.carNumberPlate}
                  onChange={handleChange}
                />
                <FormField
                  id="numberOfDays"
                  label="Number of Days"
                  type="number"
                  min={1}
                  max={365}
                  placeholder="1"
                  icon={<CalendarDays className="h-4 w-4" />}
                  value={formData.numberOfDays}
                  error={errors.numberOfDays}
                  onChange={handleChange}
                />
              </div>

              {/* Rental Duration Display */}
              {formData.numberOfDays && parseInt(formData.numberOfDays) > 0 && (
                <div className="flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/10 p-4 text-center">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold text-primary">
                    Car Gone For: {formData.numberOfDays} {parseInt(formData.numberOfDays) === 1 ? "day" : "days"}
                  </span>
                </div>
              )}
            </section>

            <div className="space-y-3">
              <Button type="submit" className="h-12 w-full text-base font-semibold" size="lg">
                <MessageCircle className="h-5 w-5" />
                Submit via WhatsApp
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Your information will be sent securely via WhatsApp to complete your booking.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

type FormFieldProps = {
  id: FieldName
  label: string
  placeholder: string
  icon: React.ReactNode
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  min?: number
  max?: number
}

function FormField({ id, label, placeholder, icon, value, error, onChange, type = "text", min, max }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} <span className="text-destructive">*</span>
      </Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <Input
          id={id}
          name={id}
          type={type}
          min={min}
          max={max}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cn("pl-9", error && "border-destructive focus-visible:ring-destructive/40")}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
