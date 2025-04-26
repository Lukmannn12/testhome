"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type User = {
  id: number
  name: string
  email: string
  role: string
  created_at: string
}

export default function DataUserPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Apakah kamu yakin ingin menghapus data ini?");
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
  
      if (!token) {
        alert("Token tidak ditemukan, silakan login kembali.");
        return;
      }
  
      // Mengirimkan permintaan untuk menghapus user berdasarkan ID
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Jika berhasil, tampilkan pesan dan perbarui state atau refresh data
      alert("User berhasil dihapus!");
  
      // Jika kamu ingin menghapus user dari state tanpa reload halaman
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error("Gagal menghapus data:", err);
      alert("Terjadi kesalahan saat menghapus user.");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token") // Ambil token dari localStorage
        const res = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
        setUsers(res.data.data || res.data) // tergantung struktur response API kamu
      } catch (error) {
        console.error("Gagal mengambil data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="px-10 py-5">
      <Table>
        <TableCaption>Daftar pengguna yang terdaftar.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Role</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : users.length > 0 ? (
            users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">{user.role}</TableCell>
                <TableCell className="text-right">{user.created_at}</TableCell>
                <TableCell className="text-right"> <Button
                      variant="destructive"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button></TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Tidak ada data pengguna.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
