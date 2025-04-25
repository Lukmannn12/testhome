"use client"


import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        const res = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          // Simpan token dan role ke localStorage
          localStorage.setItem("token", data.token);
          const userRole = data.role; // Ambil peran pengguna dari respons API
  
          // Redirect berdasarkan peran pengguna
          if (userRole === "admin") {
            router.push("/dashboard");
          } else {
            router.push("/"); // Halaman utama untuk user biasa
          }
          
          setMessage("Login berhasil!");
        } else {
          setMessage(data.error || "Login gagal");
        }
      } catch (error) {
        console.error("Login error:", error);
        setMessage("Terjadi kesalahan. Coba lagi.");
      }
    };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleLogin}>
  <div className="flex flex-col gap-6">
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="m@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="grid gap-2">
      <div className="flex items-center">
        <Label htmlFor="password">Password</Label>
        <a
          href="#"
          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
        >
          Forgot your password?
        </a>
      </div>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <Button type="submit" className="w-full">
      Login
    </Button>
  </div>
  <div className="mt-4 text-center text-sm">
    Don&apos;t have an account?{" "}
    <a href="/register" className="underline underline-offset-4">
      Sign up
    </a>
  </div>
</form>
        </CardContent>
      </Card>
    </div>
  )
}
