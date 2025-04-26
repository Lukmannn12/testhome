"use client"; // Pastikan ini ada di bagian atas file

import { useEffect, useState } from "react";
import React from 'react';
import Navbar from '../components/Navbar';
import EditProfilePage from "./EditProfilePage";

const Page = () => {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        return response.json(); // Pastikan response di-convert ke JSON
      })
      .then((data) => {
        setProfile(data); // Menyimpan data setelah di-parse
      })
      .catch((error) => {
        setError(error.message); // Menangani error
      });
  }, []); // Jangan lupa untuk menambahkan dependensi

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {profile ? (
          <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">{profile.name}</p>
              <p className="text-sm text-gray-600">{profile.email}</p>
            </div>
            <EditProfilePage profileData={profile} />
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Page;
