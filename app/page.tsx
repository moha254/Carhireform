"use client"

import type React from "react"

import Image from "next/image"
import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ClientDetails() {
  const [formData, setFormData] = useState({
    fullName: "",
    idPassport: "",
    dlNumber: "",
    citizenship: "",
    address: "",
    phoneNumber: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.idPassport.trim()) newErrors.idPassport = "ID/Passport number is required"
    if (!formData.dlNumber.trim()) newErrors.dlNumber = "Driving license number is required"
    if (!formData.citizenship.trim()) newErrors.citizenship = "Citizenship is required"
    if (!formData.address.trim()) newErrors.address = "Residential address is required"
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Format message for WhatsApp
    const message = `Shilaabo Car Hire - Client Details

Full Name: ${formData.fullName}
ID/Passport: ${formData.idPassport}
Driving License: ${formData.dlNumber}
Citizenship: ${formData.citizenship}
Address: ${formData.address}
Phone Number: ${formData.phoneNumber}`

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message)

    // Replace with your WhatsApp number (format: country code + number, no + or spaces)
    // Example: for +1 234 567 8900, use 12345678900
    const whatsappNumber = "254792837410" // Change this to Shilaabo's WhatsApp number

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-background p-3 rounded-full border border-border">
              <Image src="/logo.png" alt="Shilaabo Car Hire" width={112} height={112} priority className="h-28 w-28 object-contain" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Shilaabo Car Hire</CardTitle>
          <CardDescription className="text-base">Please provide your details to complete your booking</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? "border-destructive" : ""}
                />
                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
              </div>

              {/* ID/Passport */}
              <div className="space-y-2">
                <Label htmlFor="idPassport">
                  ID / Passport Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="idPassport"
                  name="idPassport"
                  placeholder="123456789"
                  value={formData.idPassport}
                  onChange={handleChange}
                  className={errors.idPassport ? "border-destructive" : ""}
                />
                {errors.idPassport && <p className="text-sm text-destructive">{errors.idPassport}</p>}
              </div>

              {/* Driving License */}
              <div className="space-y-2">
                <Label htmlFor="dlNumber">
                  Driving License Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="dlNumber"
                  name="dlNumber"
                  placeholder="DL123456"
                  value={formData.dlNumber}
                  onChange={handleChange}
                  className={errors.dlNumber ? "border-destructive" : ""}
                />
                {errors.dlNumber && <p className="text-sm text-destructive">{errors.dlNumber}</p>}
              </div>

              {/* Citizenship */}
              <div className="space-y-2">
                <Label htmlFor="citizenship">
                  Citizenship <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="citizenship"
                  name="citizenship"
                  placeholder="Kenya"
                  value={formData.citizenship}
                  onChange={handleChange}
                  className={errors.citizenship ? "border-destructive" : ""}
                />
                {errors.citizenship && <p className="text-sm text-destructive">{errors.citizenship}</p>}
              </div>
            </div>

            {/* Address - Full Width */}
            <div className="space-y-2">
              <Label htmlFor="address">
                Residential Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Main Street, Nairobi"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
            </div>

            {/* Phone Number - Full Width */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="+254 792 837 410"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={errors.phoneNumber ? "border-destructive" : ""}
              />
              {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber}</p>}
            </div>

            <Button type="submit" className="w-full text-lg h-12" size="lg">
              Submit via WhatsApp
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Your information will be sent securely via WhatsApp to complete your booking
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
