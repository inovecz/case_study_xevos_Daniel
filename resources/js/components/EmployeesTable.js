import React, { useState } from 'react';
import DeleteEmployeeModal from './DeleteEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';
import {getDataFromDb, getData, order, orderCol} from './EmployeeService';

function EmployeesTable({employees, setEmployee}) {

    const [filterId, setFilterId] = useState('');
    const [filterName, setFilterName] = useState('');
    const [filterSurname, setFilterSurname] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterSalary, setFilterSalary] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState([]);

    function FilterData (){
       return employees.filter((employee) => {
                return (employee.employee_ID === null ? true : employee.employee_ID.toString().includes(filterId.toString()))
                    && (filterName === null ? true : employee.name.toString().toLowerCase().includes(filterName.toString().toLowerCase())) 
                    && (filterSurname === null ? true : employee.surname.toString().toLowerCase().includes(filterSurname.toString().toLowerCase())) 
                    && (filterDate === '' ? true : (employee.date === null ? false : Date.parse(employee.date) == Date.parse(filterDate))) 
                    && (filterSalary === '' ? true : (employee.salary === null ? false : employee.salary.toString().includes(filterSalary.toString())))
            })
    }

    return (
        <div className="container mt-2">
            <table className="table table-striped">
                <thead>
                    <tr className='table-primary'>
                        <th 
                            className="th-sort" onClick={() => getDataFromDb(setEmployee, 'employee_ID')} scope="col"> Id 
                            {order && orderCol  === 'employee_ID' ? <i className="sort-arrow fas fa-arrow-down"></i> : orderCol && orderCol  === 'employee_ID' ? <i className="sort-arrow fas fa-arrow-up"></i> : null}
                        </th>
                        <th 
                            className="th-sort" onClick={() => getDataFromDb(setEmployee, 'name')} scope="col"> Jméno 
                            {order && orderCol  === 'name' ? <i className="sort-arrow fas fa-arrow-down"></i> : orderCol && orderCol  === 'name' ? <i className="sort-arrow fas fa-arrow-up"></i> : null}
                        </th>
                        <th 
                            className="th-sort" onClick={() => getDataFromDb(setEmployee, 'surname')} scope="col"> Příjmení 
                            {order && orderCol  === 'surname' ? <i className="sort-arrow fas fa-arrow-down"></i> : orderCol && orderCol  === 'surname' ? <i className="sort-arrow fas fa-arrow-up"></i> : null}
                        </th>
                        <th 
                            className="th-sort" onClick={() => getDataFromDb(setEmployee, 'date')} scope="col"> Datum 
                            {order && orderCol  === 'date' ? <i className="sort-arrow fas fa-arrow-down"></i> : orderCol && orderCol  === 'date' ? <i className="sort-arrow fas fa-arrow-up"></i> : null}
                        </th>
                        <th 
                            className="th-sort" onClick={() => getDataFromDb(setEmployee, 'salary')} scope="col"> Plat 
                            {order && orderCol  === 'salary' ? <i className="sort-arrow fas fa-arrow-down"></i> : orderCol && orderCol  === 'salary' ? <i className="sort-arrow fas fa-arrow-up"></i> : null}
                        </th>
                        <th 
                            scope="col">
                        </th>
                        <th 
                            scope="col">
                        </th>
                    </tr>
                </thead>
                <tbody className='table-striped'>
                    <tr>
                        <td><input className="form-control" type="text" onChange={(e) => setFilterId(e.target.value)}/></td> 
                        <td><input className="form-control" type="text" onChange={(e) => setFilterName(e.target.value)}/></td> 
                        <td><input className="form-control" type="text" onChange={(e) => setFilterSurname(e.target.value)}/></td> 
                        <td><input className="form-control" type="date" onChange={(e) => setFilterDate(e.target.value)} /></td> 
                        <td><input className="form-control" type="text" onChange={(e) => setFilterSalary(e.target.value)} /></td> 
                        <td></td>
                        <td></td>
                    </tr>
                    {FilterData().length <= 0 ? <tr><td className='text-center' colSpan={5}> Nebyly nalezeny žádné záznamy. </td></tr> : FilterData().map(employee => {
                        return  <tr key={employee.employee_ID}> 
                            <td>{employee.employee_ID} </td> 
                            <td>{employee.name} </td>
                            <td>{employee.surname} </td>
                            <td>{employee.date} </td>
                            <td>{employee.salary} </td>
                            <td><i className="fas fa-edit" data-bs-toggle="modal" data-bs-target="#editEmployeeModal" onClick={() => setSelectedEmployee(employee)}></i></td>
                            <td><i className="fas fa-trash" data-bs-toggle="modal" data-bs-target="#deleteEmployeeModal" onClick={() => setSelectedEmployee(employee)}></i></td>
                        </tr>
                    })}
                </tbody>
            </table>
            <EditEmployeeModal Employee={selectedEmployee} />
            <DeleteEmployeeModal Employee={selectedEmployee} />
        </div>
    );
}

export default EmployeesTable;
