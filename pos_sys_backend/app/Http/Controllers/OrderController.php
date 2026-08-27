<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('items');

        if ($request->query('from')) {
            $query->whereDate('created_at', '>=', $request->query('from'));
        }

        if ($request->query('to')) {
            $query->whereDate('created_at', '<=', $request->query('to'));
        }

        return response()->json($query->orderByDesc('created_at')->get());
    }

    public function show(Order $order)
    {
        return response()->json($order->load('items', 'user'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.productId' => 'nullable|integer',
            'items.*.name' => 'required|string|max:255',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.image' => 'nullable|string',
            'items.*.remarks' => 'nullable|string',
            'subtotal' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'paymentMethod' => 'nullable|string|max:50',
            'amountReceived' => 'nullable|numeric|min:0',
            'change' => 'nullable|numeric|min:0',
            'status' => 'nullable|string|max:50',
        ]);

        $order = DB::transaction(function () use ($data) {
            $total = $data['total'];
            $subtotal = $data['subtotal'] ?? $total;
            $discount = $data['discount'] ?? 0;

            $order = Order::create([
                'user_id' => auth('sanctum')->id(),
                'order_code' => 'ORD-' . now()->format('Ymd') . '-' . strtoupper(substr(uniqid(), -5)),
                'subtotal' => $subtotal,
                'discount' => $discount,
                'total' => $total,
                'payment_method' => $data['paymentMethod'] ?? 'Cash',
                'amount_received' => $data['amountReceived'] ?? $total,
                'change' => $data['change'] ?? 0,
                'status' => $data['status'] ?? 'Completed',
            ]);

            foreach ($data['items'] as $item) {
                $order->items()->create([
                    'product_id' => $item['productId'] ?? null,
                    'name' => $item['name'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'image' => $item['image'] ?? null,
                    'remarks' => $item['remarks'] ?? null,
                ]);

                if (! empty($item['productId'])) {
                    Product::where('id', $item['productId'])
                        ->where('stock', '>', 0)
                        ->decrement('stock', $item['quantity']);
                }
            }

            return $order;
        });

        return response()->json($order->load('items'), 201);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $data = $request->validate([
            'status' => 'required|string|max:50',
        ]);

        $order->update(['status' => $data['status']]);

        return response()->json($order->load('items'));
    }

    public function today(Request $request)
    {
        $orders = Order::with('items')
            ->whereDate('created_at', now()->toDateString())
            ->orderByDesc('created_at')
            ->get();

        return response()->json($orders);
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return response()->json(['message' => 'Order deleted.']);
    }
}
