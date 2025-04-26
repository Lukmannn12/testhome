"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function EditProfilePage({ profileData }: any) {
  const [users, setProfile] = useState({
    id: profileData?.id || "",
    name: profileData?.name || "",
    email: profileData?.email || "",
    password: "",
    password_confirmation: "",
  });
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<any>({}); // Menyimpan error dari backend

  useEffect(() => {
    if (profileData) {
      setProfile({
        id: profileData.id,
        name: profileData.name,
        email: profileData.email,
        password: "",
        password_confirmation: "",
      });
    }
  }, [profileData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(users);

    axios.put(
      `http://127.0.0.1:8000/api/profile/${users.id}`,
      users,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    )
      .then(() => {
        alert("Profile berhasil diupdate!");
        setOpen(false); // Tutup dialog
        window.location.reload(); // Reload halaman
      })
      .catch((err) => {
        if (err.response && err.response.data.errors) {
          // Set error yang didapatkan dari backend
          setErrors(err.response.data.errors);
        } else {
          console.error("Gagal update:", err);
        }
      });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Ubah data profil lalu klik "Save changes".
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={users.name || ""}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="Your name"
                  required
                />
                {errors.name && <span className="text-red-500 col-span-4">{errors.name[0]}</span>}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={users.email || ""}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="Your email"
                  required
                />
                {errors.email && <span className="text-red-500 col-span-4">{errors.email[0]}</span>}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={users.password}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="New password (optional)"
                />
                {errors.password && <span className="text-red-500 col-span-4">{errors.password[0]}</span>}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="passwordConfirmation" className="text-right">
                  Confirm Password
                </Label>
                <Input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  value={users.password_confirmation}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="Confirm new password"
                />
                {errors.password_confirmation && (
                  <span className="text-red-500 col-span-4">{errors.password_confirmation[0]}</span>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
