<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'price',
        'cost',
        'stock',
        'status',
        'image',
        'description',
        'customizable',
    ];

    protected $casts = [
        'price' => 'float',
        'cost' => 'float',
        'stock' => 'integer',
        'customizable' => 'boolean',
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
