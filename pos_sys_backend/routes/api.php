<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\StatsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // Public auth routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Public-ish data (products for the POS, settings for receipts)
    Route::get('/settings', [SettingController::class, 'get']);

    // Authenticated routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::apiResource('products', ProductController::class);

        Route::get('/orders/today', [OrderController::class, 'today']);
        Route::get('/orders', [OrderController::class, 'index']);
        Route::get('/orders/{order}', [OrderController::class, 'show']);
        Route::post('/orders', [OrderController::class, 'store']);
        Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus']);
        Route::delete('/orders/{order}', [OrderController::class, 'destroy']);

        Route::get('/stats/dashboard', [StatsController::class, 'dashboard']);
        Route::get('/stats/sales', [StatsController::class, 'sales']);

        Route::put('/settings', [SettingController::class, 'update']);
    });
});

// Fallback default route for the /user of the root namespace (kept for parity)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
