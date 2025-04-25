"use client";

import { useState, useEffect } from "react";
import EditProductPage from "./EditProductPage";
import { CreateProduct } from "./create/page";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export default function DataProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Apakah kamu yakin ingin menghapus produk ini?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://127.0.0.1:8000/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Produk berhasil dihapus!");
      window.location.reload();
    } catch (err) {
      console.error("Gagal menghapus produk:", err);
      alert("Terjadi kesalahan saat menghapus produk.");
    }
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  // Fungsi untuk menangani pembaruan produk setelah diubah


  return (
    <div className="p-5">
      <CreateProduct />
      <div className="overflow-x-auto shadow-md sm:rounded-lg py-5">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.description}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <EditProductPage productData={product} />
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
