<?php

use App\Http\Controllers\API\EmployeeController;
use App\Http\Controllers\API\TestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/getEmployees', [EmployeeController::class, 'getEmployees']);
Route::post('/getEmployeesFromDb', [EmployeeController::class, 'getEmployeesFromDb']);
Route::post('/updateEmployee', [EmployeeController::class, 'updateEmployee']);
Route::get('/compareEmployees', [EmployeeController::class, 'compareEmployees']);
Route::delete('/deleteEmployee', [EmployeeController::class, 'deleteEmployee']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

