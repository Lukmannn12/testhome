<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $profile)
    {
        try {
            // Validasi input
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,' . $profile->id,
                'password' => 'nullable|string|min:6|confirmed', // optional password
            ], [
                'name.required' => 'Nama wajib diisi.',
                'email.required' => 'Email wajib diisi.',
                'email.email' => 'Format email tidak valid.',
                'email.unique' => 'Email sudah digunakan.',
                'password.min' => 'Password minimal 6 karakter.',
                'password.confirmed' => 'Konfirmasi password tidak sesuai.',
            ]);
    
            // Update nama dan email
            $profile->name = $validated['name'];
            $profile->email = $validated['email'];
    
            // Jika ada password baru, enkripsi dan simpan
            if (!empty($validated['password'])) {
                $profile->password = bcrypt($validated['password']);
            }
    
            // Simpan perubahan
            $profile->save();
    
            // Response sukses
            return response()->json([
                'message' => 'Profil berhasil diperbarui',
                'user' => $profile
            ], 200);
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Tangani error validasi dan kembalikan response error
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Tangani error lainnya (misalnya database error)
            return response()->json([
                'message' => 'Terjadi kesalahan, coba lagi nanti.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    try {
        // Mencari user berdasarkan ID
        $user = User::findOrFail($id);
        
        // Menghapus user dari database
        $user->delete(); 
        
        return response()->json([
            'message' => 'User berhasil dihapus.'
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Gagal menghapus user.',
            'error' => $e->getMessage()
        ], 500);
    }
}

}
