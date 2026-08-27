<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Iced Latte', 'category' => 'Coffee', 'price' => 2.5, 'cost' => 1.05, 'stock' => 70, 'customizable' => true, 'image' => 'iced-latte.png'],
            ['name' => 'Cappuccino', 'category' => 'Coffee', 'price' => 2.0, 'cost' => 0.85, 'stock' => 64, 'customizable' => true, 'image' => 'cappuccino.png'],
            ['name' => 'Americano', 'category' => 'Coffee', 'price' => 1.8, 'cost' => 0.60, 'stock' => 80, 'customizable' => true, 'image' => 'americano.png'],
            ['name' => 'Espresso', 'category' => 'Coffee', 'price' => 1.5, 'cost' => 0.48, 'stock' => 95, 'customizable' => false, 'image' => 'espresso.png'],
            ['name' => 'Mocha', 'category' => 'Coffee', 'price' => 2.7, 'cost' => 1.15, 'stock' => 58, 'customizable' => true, 'image' => 'mocha.png'],
            ['name' => 'Caramel Macchiato', 'category' => 'Coffee', 'price' => 2.8, 'cost' => 1.20, 'stock' => 47, 'customizable' => true, 'image' => 'caramel-macchiato.png'],
            ['name' => 'Cold Brew', 'category' => 'Coffee', 'price' => 2.6, 'cost' => 0.90, 'stock' => 42, 'customizable' => true, 'image' => 'iced-coffee.png'],
            ['name' => 'Flat White', 'category' => 'Coffee', 'price' => 2.35, 'cost' => 0.95, 'stock' => 35, 'customizable' => true, 'image' => 'cappuccino.png'],
            ['name' => 'Matcha Latte', 'category' => 'Tea', 'price' => 2.6, 'cost' => 1.10, 'stock' => 51, 'customizable' => true, 'image' => 'matcha-latte.png'],
            ['name' => 'Jasmine Green Tea', 'category' => 'Tea', 'price' => 1.9, 'cost' => 0.55, 'stock' => 66, 'customizable' => true, 'image' => 'matcha-latte.png'],
            ['name' => 'Milk Tea', 'category' => 'Tea', 'price' => 2.25, 'cost' => 0.82, 'stock' => 44, 'customizable' => true, 'image' => 'iced-latte.png'],
            ['name' => 'Thai Tea', 'category' => 'Tea', 'price' => 2.35, 'cost' => 0.90, 'stock' => 38, 'customizable' => true, 'image' => 'iced-latte.png'],
            ['name' => 'Hot Chocolate', 'category' => 'Non-Coffee', 'price' => 2.2, 'cost' => 0.95, 'stock' => 39, 'customizable' => true, 'image' => 'mocha.png'],
            ['name' => 'Vanilla Steamer', 'category' => 'Non-Coffee', 'price' => 2.1, 'cost' => 0.80, 'stock' => 32, 'customizable' => true, 'image' => 'cappuccino.png'],
            ['name' => 'Mango Smoothie', 'category' => 'Smoothies', 'price' => 3.25, 'cost' => 1.35, 'stock' => 25, 'customizable' => true, 'image' => 'iced-coffee.png'],
            ['name' => 'Berry Smoothie', 'category' => 'Smoothies', 'price' => 3.4, 'cost' => 1.45, 'stock' => 23, 'customizable' => true, 'image' => 'iced-coffee.png'],
            ['name' => 'Croissant', 'category' => 'Bakery', 'price' => 1.9, 'cost' => 0.75, 'stock' => 28, 'customizable' => false, 'image' => null],
            ['name' => 'Almond Croissant', 'category' => 'Bakery', 'price' => 2.45, 'cost' => 1.05, 'stock' => 18, 'customizable' => false, 'image' => null],
            ['name' => 'Blueberry Muffin', 'category' => 'Bakery', 'price' => 1.75, 'cost' => 0.68, 'stock' => 24, 'customizable' => false, 'image' => null],
            ['name' => 'Cinnamon Roll', 'category' => 'Bakery', 'price' => 2.15, 'cost' => 0.85, 'stock' => 16, 'customizable' => false, 'image' => null],
            ['name' => 'Cheesecake', 'category' => 'Desserts', 'price' => 3.1, 'cost' => 1.35, 'stock' => 14, 'customizable' => false, 'image' => null],
            ['name' => 'Brownie', 'category' => 'Desserts', 'price' => 1.95, 'cost' => 0.70, 'stock' => 22, 'customizable' => false, 'image' => null],
            ['name' => 'Tiramisu Cup', 'category' => 'Desserts', 'price' => 3.25, 'cost' => 1.45, 'stock' => 12, 'customizable' => false, 'image' => null],
            ['name' => 'Pumpkin Spice Latte', 'category' => 'Seasonal', 'price' => 3.15, 'cost' => 1.30, 'stock' => 20, 'customizable' => true, 'image' => 'caramel-macchiato.png'],
            ['name' => 'House Coffee Beans', 'category' => 'Merchandise', 'price' => 8.5, 'cost' => 4.20, 'stock' => 30, 'customizable' => false, 'image' => null],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(
                ['name' => $product['name']],
                $product + ['status' => 'Active']
            );
        }
    }
}