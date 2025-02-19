<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';

    protected $fillable = [
        'name',
        'email',
        'password',
        'verification_code',
        'login_token',
        'attempts',
        'cooldown',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'verification_code',
        'login_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'cooldown' => 'datetime',
    ];
}
