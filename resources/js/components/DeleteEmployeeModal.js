import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { deleteData } from './EmployeeService';

export default function DeleteEmployeeModal({Employee}){

const [employee, setEmployee] = useState([]);

useEffect(() => {

    setEmployee({...Employee});
    formik.resetForm();

}, [Employee]);

const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      data: employee,
    },
    onSubmit: values => {
        deleteData(values.data);
    },
  });

return (
<div className="modal fade" id="deleteEmployeeModal" tabIndex="-1" role="dialog" aria-labelledby="deleteEmployeeModal" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="deleteEmployeeModal">Smazání zaměstnance</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="container">
            Opravdu si přejete tento záznam smazat?
            <form onSubmit={formik.handleSubmit}>
                
            </form>
        </div>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Storno</button>
        <button type="submit" onClick={formik.handleSubmit} data-bs-dismiss="modal" className="btn btn-primary">Potvrdit</button>
      </div>
    </div>
  </div>
</div>
)
}