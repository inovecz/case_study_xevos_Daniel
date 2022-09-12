import React, { useEffect, useState } from 'react';
import EmployeesTable from './EmployeesTable';
import { getDataFromDb, getData, compareData } from './EmployeeService';

function Employee() {
    useEffect(() => {
        getDataFromDb(setData);
    }, [Data])

    const [Data, setData] = useState([]);

    return (
        <div className="container">
            <h1 className='mx-3 mb-1'> Evidence zaměstnanců </h1>
            <button className='btn btn-primary ml-3 mr-2' onClick={() => getData(setData)}>Aktualizovat data ze zdroje</button>
            <button className='btn btn-secondary' onClick={() => compareData(setData)}>Porovnat data se zdrojem a přiřadit platy</button>
            {Data && < EmployeesTable employees={Data} setEmployee={setData}/>}
        </div>
    );
}

export default Employee;
