<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustProxies as Middleware;
use Symfony\Component\HttpFoundation\Request; // ត្រូវប្រើ Symfony Request ត្រង់នេះ

class TrustProxies extends Middleware
{
    /**
     * @var array<int, string>|string|null
     */
    protected $proxies = '*';

    /**
     * @var int
     */
    protected $headers =
        Request::HEADER_X_FORWARDED_FOR |
        Request::HEADER_X_FORWARDED_HOST |
        Request::HEADER_X_FORWARDED_PORT |
        Request::HEADER_X_FORWARDED_PROTO;
}