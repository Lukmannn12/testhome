"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CreateProduct } from "./create/page";

// Mendeklarasikan tipe produk
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export default function DataProdukPage() {
  // State untuk menyimpan data produk
  const [products, setProducts] = useState<Product[]>([]);  // Gunakan tipe Product
  const [error, setError] = useState<string | null>(null);

  // Mengambil data produk dari API
  useEffect(() => {
    // Ganti URL dengan API endpoint yang sesuai
    fetch("http://127.0.0.1:8000/api/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Jika menggunakan token
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data); // Menyimpan data produk ke dalam stat
      })
      .catch((error) => {
        setError(error.message); // Menyimpan pesan error jika terjadi kesalahan
      });
  }, []); // Dependency array kosong berarti hanya dijalankan sekali setelah komponen dipasang


  return (
    <div className="p-5">
      <CreateProduct />
      <div  className="py-5">
      <Table>
        <TableCaption>A list of your recent products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stok</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={0}>No products available.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}
