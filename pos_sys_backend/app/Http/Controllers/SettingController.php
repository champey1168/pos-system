<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function get()
    {
        $all = Setting::pluck('value', 'key')->map(fn ($v) => json_decode($v, true) ?? $v);

        return response()->json($all);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'storeName' => 'nullable|string|max:255',
            'Image' => 'nullable|string',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:255',
            'currency' => 'nullable|string|max:20',
            'receiptFooter' => 'nullable|string',
        ]);

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => json_encode($value)],
            );
        }

        return response()->json($this->get()->getData());
    }
}
