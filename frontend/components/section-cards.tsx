"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  const [totalUsers, setTotalUsers] = useState<number | null>(null)
  const [totalProduct, setTotalProduct] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const token = localStorage.getItem("token") // Ambil token dari localStorage
        const res = await axios.get("http://127.0.0.1:8000/api/total-users", {
          headers: {
            Authorization: `Bearer ${token}`, // Kirim token sebagai header
            Accept: "application/json",
          },
        })
        setTotalUsers(res.data.total_users)
      } catch (error) {
        console.error("Gagal mengambil total users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTotalUsers()
  }, [])

  useEffect(() => {
    const fetchTotalProduct = async () => {
      try {
        const token = localStorage.getItem("token") // Ambil token dari localStorage
        const res = await axios.get("http://127.0.0.1:8000/api/total-product", {
          headers: {
            Authorization: `Bearer ${token}`, // Kirim token sebagai header
            Accept: "application/json",
          },
        })
        setTotalProduct(res.data.total_product)
      } catch (error) {
        console.error("Gagal mengambil total users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTotalProduct()
  }, [])

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
  {/* Kartu untuk Total User */}
  <Card className="@container/card">
    <CardHeader>
      <CardDescription>Total User</CardDescription>
      <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
        {loading ? "Loading..." : totalUsers}
      </CardTitle>
    </CardHeader>
  </Card>

  {/* Kartu untuk Total Produk */}
  <Card className="@container/card">
  <CardHeader>
    <CardDescription>Total Produk</CardDescription>
    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
      {loading
        ? "Loading..."
        : totalProduct && totalProduct > 0
        ? totalProduct
        : "Tidak ada produk"}
    </CardTitle>
  </CardHeader>
</Card>
</div>
  )
}
