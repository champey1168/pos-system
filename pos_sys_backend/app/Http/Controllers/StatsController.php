<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request; // កែត្រង់នេះ៖ ប្រើ Illuminate Request ជំនួស Controller Request
use Illuminate\Support\Facades\DB; // បន្ថែម Facade នេះដើម្បីភាពស្អាតនៃកូដ

class StatsController extends Controller
{
    public function dashboard()
    {
        $today = Carbon::today();

        $todayOrders = Order::whereDate('created_at', $today)->get();

        $todayRevenue = $todayOrders->sum('total');
        $todayCount = $todayOrders->count();

        $lowStock = Product::where('status', '!=', 'Deleted')
            ->where('stock', '<=', 10)
            ->orderBy('stock')
            ->take(10)
            ->get(['id', 'name', 'category', 'stock', 'price']);

        $topSelling = DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->selectRaw('products.id, products.name, SUM(order_items.quantity) as sold')
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('sold')
            ->take(5)
            ->get();

        return response()->json([
            'todayRevenue' => $todayRevenue,
            'todayOrders' => $todayCount,
            'totalProducts' => Product::where('status', '!=', 'Deleted')->count(),
            'lowStock' => $lowStock,
            'topSelling' => $topSelling,
        ]);
    }

    public function sales(Request $request)
    {
        $from = $request->query('from');
        $to = $request->query('to');

        // ១. Filter Orders តាម Date
        $query = Order::query();

        if ($from) {
            $query->whereDate('created_at', '>=', $from);
        }

        if ($to) {
            $query->whereDate('created_at', '<=', $to);
        }

        $orders = $query->get();
        $revenue = $orders->sum('total');

        // ២. Filter byProduct តាម Date ផងដែរ
        $byProductQuery = DB::table('order_items')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->selectRaw('order_items.name, SUM(order_items.quantity) as quantity, SUM(order_items.price * order_items.quantity) as total');

        if ($from) {
            $byProductQuery->whereDate('orders.created_at', '>=', $from);
        }
        if ($to) {
            $byProductQuery->whereDate('orders.created_at', '<=', $to);
        }

        $byProduct = $byProductQuery->groupBy('order_items.name')
            ->orderByDesc('total')
            ->get();

        // ៣. Filter byCategory តាម Date ផងដែរ
        $byCategoryQuery = DB::table('order_items')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->selectRaw('products.category, SUM(order_items.price * order_items.quantity) as total');

        if ($from) {
            $byCategoryQuery->whereDate('orders.created_at', '>=', $from);
        }
        if ($to) {
            $byCategoryQuery->whereDate('orders.created_at', '<=', $to);
        }

        $byCategory = $byCategoryQuery->groupBy('products.category')
            ->orderByDesc('total')
            ->get();

        return response()->json([
            'orders' => $orders->load('items'),
            'revenue' => $revenue,
            'orderCount' => $orders->count(),
            'byProduct' => $byProduct,
            'byCategory' => $byCategory,
        ]);
    }
}