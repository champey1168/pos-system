<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_code',
        'subtotal',
        'discount',
        'total',
        'payment_method',
        'amount_received',
        'change',
        'status',
    ];

    protected $casts = [
        'subtotal' => 'float',
        'discount' => 'float',
        'total' => 'float',
        'amount_received' => 'float',
        'change' => 'float',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
