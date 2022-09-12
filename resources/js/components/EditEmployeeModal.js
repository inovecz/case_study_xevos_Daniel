import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { updateData } from './EmployeeService';

export default function EditEmployeeModal({Employee}){

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
        updateData(values.data);
    },
  });

return (
<div className="modal fade" id="editEmployeeModal" tabIndex="-1" role="dialog" aria-labelledby="editEmployeeModal" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="editEmployeeModal">Editace zaměstnance</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="container">
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-sm">
                        Jméno:
                        <input className="form-control" name="data[name]" type="text" onChange={formik.handleChange}
                                    value={formik.values.data.name || ''} />
                    </div>
                    <div className="col-sm">
                        Příjmení:
                        <input className="form-control" name="data[surname]" type="text" onChange={formik.handleChange}
                                    value={formik.values.data.surname || ''}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        Datum:
                        <input className="form-control" name="data[date]" type="date" onChange={formik.handleChange}
                                    value={formik.values.data.date || ''}/>
                    </div>
                    <div className="col-sm">
                        Plat:
                        <input className="form-control" name="data[salary]" type="text" onChange={formik.handleChange}
                                    value={formik.values.data.salary || ''}/>
                    </div>
                </div>
            </form>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Zavřít</button>
        <button type="submit" onClick={formik.handleSubmit} data-bs-dismiss="modal" className="btn btn-primary">Uložit změny</button>
      </div>
    </div>
  </div>
</div>
)
}