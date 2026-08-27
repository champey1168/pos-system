<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        $search = $request->query('search', '');
        $category = $request->query('category', '');

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            });
        }

        if ($category !== '' && $category !== 'All') {
            $query->where('category', $category);
        }

        if ($request->query('onlyActive') === '1' || $request->query('onlyActive') === 'true') {
            $query->where('status', '!=', 'Deleted');
        }

        return response()->json($query->orderBy('id')->get());
    }

    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $data = $this->validatedProduct($request);

        $product = Product::create($data);

        return response()->json($product, 201);
    }

    public function update(Request $request, Product $product)
    {
        $data = $this->validatedProduct($request);

        $product->update($data);

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Product deleted.']);
    }

    private function validatedProduct(Request $request)
    {
        return $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'price' => 'required|numeric|min:0',
            'cost' => 'nullable|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'status' => 'nullable|string|max:50',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'customizable' => 'nullable|boolean',
        ]);
    }
}
