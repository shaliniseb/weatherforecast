<?php

use App\Http\Controllers\Api\WeatherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('currentWeather/{place}', [WeatherController::class, 'currentWeather']);
Route::get('dayWeather/{place}', [WeatherController::class, 'dayWeather']);
Route::get('weeklyWeather/{place}', [WeatherController::class, 'weeklyWeather']);
