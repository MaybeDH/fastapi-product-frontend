"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.username.trim()) {
      setError("El nombre de usuario es obligatorio")
      return
    }

    if (!formData.password) {
      setError("La contraseña es obligatoria")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append("grant_type", "password");
      urlEncodedData.append("username", formData.username);
      urlEncodedData.append("password", formData.password);
      urlEncodedData.append("scope", "");
      urlEncodedData.append("client_id", "string");
      urlEncodedData.append("client_secret", "string");

      const resp = await fetch("http://localhost:8000/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
        },
        body: urlEncodedData.toString(),
      });

      const data = await resp.json();

      // TODO: migrate to cookies, handle refresh token

      // resp succesfully
      //   {
      //     "data": {
      //         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYXlhbmEiLCJpZCI6MywiZW1haWwiOiJkYXlhbmFAZ21haWwuY29tIiwiZXhwIjoxNzQyOTE1NDk1fQ.4if7qA2HR8s6wLmFEfj7y12-WaADBrIWSQa1OkCWq9s",
      //         "token_type": "bearer",
      //         "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYXlhbmEiLCJpZCI6MywiZW1haWwiOiJkYXlhbmFAZ21haWwuY29tIiwiZXhwIjoxNzQzNTE4NDk1fQ.Xol9O3qCag_4ieuG-LVtM-fXCbt3nZzBdS2TVFmbpog"
      //     }
      // }

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        router.push("/products");
      } else {
        throw new Error("Credenciales inválidas")
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">Ingrese sus credenciales para acceder al sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Ingrese su nombre de usuario"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  ¿Olvidó su contraseña?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Ingrese su contraseña"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={handleCheckboxChange}
                disabled={isLoading}
              />
              <Label htmlFor="rememberMe" className="text-sm font-normal">
                Recordar mis datos
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            ¿No tiene una cuenta?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Registrarse
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

