<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/user/register', 'App\Http\Controllers\UserController@register');
Route::post('/user/verifycode', 'App\Http\Controllers\UserController@verifyCode');
Route::post('/user/login', 'App\Http\Controllers\UserController@login');
Route::post('user/logout', 'App\Http\Controllers\UserController@logout');
Route::post('/application/insert', 'App\Http\Controllers\ApplicationController@insertApplication');
Route::post('/test', 'App\Http\Controllers\ApplicationController@text');
Route::get('/application/getall', 'App\Http\Controllers\ApplicationController@getAllApplications');
Route::post('application/approve', 'App\Http\Controllers\ApplicationController@approveApplication');
Route::post('application/reject', 'App\Http\Controllers\ApplicationController@rejectApplication');