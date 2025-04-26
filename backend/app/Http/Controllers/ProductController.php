<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all(); // Ambil semua data produk
        return response()->json($products);
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
        // Validasi input dari pengguna
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        $validated['user_id'] = Auth::id();

        // Membuat produk baru dan menyimpannya ke database
        $product = Product::create($validated);

        // Mengembalikan response JSON dengan produk yang telah disimpan
        return response()->json($product, 200);
    }


    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        // Validasi input dari pengguna
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        // Update produk dengan data yang divalidasi
        $product->update($validated);

        // Mengembalikan response JSON dengan produk yang telah diperbarui
        return response()->json($product, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            $product->delete(); // Menghapus produk dari database
    
            return response()->json([
                'message' => 'Produk berhasil dihapus.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menghapus produk.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function publicIndex()
    {
        $products = Product::all(); // Ambil semua data produk
        return response()->json($products);
    }

    public function totalProduct()
    {
        $totalProducts = Product::count();

        // Mengembalikan respons API dengan jumlah total produk
        return response()->json([
            'total_products' => $totalProducts
        ]);
    }
}
