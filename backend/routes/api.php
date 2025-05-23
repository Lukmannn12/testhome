<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:api')->post('logout', [AuthController::class, 'logout']);
Route::middleware('auth:api')->get('users', [AuthController::class, 'getAllUsers']);

Route::middleware('auth:api')->resource('product', ProductController::class);
Route::middleware('auth:api')->resource('profile', ProfileController::class);

Route::get('/public-products', [ProductController::class, 'publicIndex']);
Route::middleware('auth:api')->get('/total-users', [AuthController::class, 'totalUsers']);
Route::middleware('auth:api')->get('/total-product', [ProductController::class, 'totalProduct']);
Route::middleware('auth:api')->delete('users/{id}', [ProfileController::class, 'destroy']);

