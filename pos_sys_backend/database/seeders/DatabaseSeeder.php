<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('password');

        User::firstOrCreate(
            ['email' => 'admin@coffeeshop.local'],
            ['name' => 'Admin', 'phone' => '012345678', 'role' => 'Admin', 'password' => $password],
        );

        User::firstOrCreate(
            ['email' => 'jane@coffeeshop.local'],
            ['name' => 'Jane Doe', 'phone' => '012345678', 'role' => 'Cashier', 'password' => $password],
        );

        $this->call(ProductSeeder::class);
    }
}
