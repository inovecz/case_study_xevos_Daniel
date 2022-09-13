<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

//@TODO -> response if failed in every method
class EmployeeController extends Controller
{
    public function getEmployees(): JsonResponse{
        $employees = Http::get('https://xevos.store/domaci-ukol/Jmena.json')->json();
        DB::table('employee')->delete();
        $this->insertAllEmployees($employees);
        return response()->json([
            'status' => 200,
            'message' => 'all employees inserted',
            'employees' => $employees
        ]);
    }

    public function insertAllEmployees($employees){
        foreach ($employees as $employee) {
            $employeeDB = new Employee();
            $employeeDB->employee_ID = $employee["id"];
            $employeeDB->name = $employee["jmeno"];
            $employeeDB->surname = $employee["prijmeni"];
            $employeeDB->date = $employee["date"];
            $employeeDB->save();
        }
    }

    public function getEmployeesFromDb(Request $request): JsonResponse{
        $employees = new Employee();
        $orderColumn = $request->input('orderColumn');
        $orderDirection = $request->input('order');
        if($orderDirection == true){
            $orderDirection = 'ASC';
        }
        else {
            $orderDirection = 'DESC';
        }
        if($orderColumn){
            $employees = $employees->orderBy($orderColumn, $orderDirection);
        }
        $employees = $employees->get();
        return response()->json([
            'status' => 200,
            'employees' => $employees
        ]);
    }

    public function updateEmployee(Request $request): JsonResponse {
        $id = $request->input("id");
        $employeeDB = Employee::find($id);
        $employeeDB->name = $request->input("name");
        $employeeDB->surname = $request->input("surname");
        $employeeDB->date = $request->input("date");
        $employeeDB->date = $request->input("salary");
        $employeeDB->update();
        return response()->json([
            'status' => 200,
            'message' => 'Employee succesfully updated'
        ]);
    }

    public function deleteEmployee(Request $request): JsonResponse {
        $id = $request->input("id");
        $employeeDB = Employee::find($id);
        $employeeDB->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Employee succesfully deleted'
        ]);
    }

    public function compareEmployees(Request $request): JsonResponse {
        $this->getEmployees();
        $employees = Employee::all();
        $employees1 = Http::get('https://xevos.store/domaci-ukol/Zamestnavatel1.json')->json();
        $employees2 = Http::get('https://xevos.store/domaci-ukol/Zamestnavatel2.json')->json();
        $employees3 = Http::get('https://xevos.store/domaci-ukol/Zamestnavatel3.json')->json();

        $merged = array_merge($employees1, $employees2, $employees3);

        foreach ($employees as $employee) {
            foreach ($merged as $mergedEmployee) {
                if($employee->name == $mergedEmployee['jmeno'] && $employee->surname == $mergedEmployee['prijmeni'] && $mergedEmployee['plat'] >= $employee->salary){
                    $salaryInt = intval($mergedEmployee['plat']);
                    if($salaryInt != 0 && $salaryInt != NULL){
                        $employeeDB = Employee::find($employee->id);
                        $employeeDB->salary = $salaryInt;
                        $employeeDB->update();
                    }
                }
            }
        }

        $employees = Employee::all();

        return response()->json([
            'status' => 200,
            'message' => 'Employee succesfully compared',
            'employess' => $employees
        ]);
    }
}
