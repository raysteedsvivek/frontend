import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllEmployees, deleteEmployee } from "../api/employee";
import { successAlert, errorAlert } from "../services/swal";
import Swal from 'sweetalert2';

function List() {
    const [employeeList, setEmployeeList] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployess()
    }, [])

    const fetchEmployess = () => {
        getAllEmployees().then(
            res => setEmployeeList(res)
        ).catch(
            err => errorAlert('Error', 'Something went wrong.')
        )
    }

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, please delete',
            cancelButtonText: 'No, cancel',
        }).then(result => {
            if (result.isConfirmed) {
                const data = { "_id": id }
                deleteEmployee(data)
                    .then(res => {
                        fetchEmployess();
                        successAlert('Deleted', 'Data has been deleted.');
                    }).catch(err => {
                        errorAlert('Error', 'Something went wrong.');
                    })
            }
        });
    };

    return (
        <div className='contain-table'>
            <table className='striped-table'>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Designation</th>
                        <th>Employee Id</th>
                        <th colSpan={2} className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employeeList &&
                        employeeList.map((emp, index) => (
                            <tr key={emp._id}>
                                <td>{index + 1}</td>
                                <td>{`${emp.firstname} ${emp.lastname}`}</td>
                                <td>{emp.email}</td>
                                <td>{emp.phone}</td>
                                <td>{emp.designation} </td>
                                <td>{emp.employee_id} </td>
                                <td className="text-right">
                                    <button
                                        onClick={() => navigate(`/view/${emp._id}`)}
                                        className="button muted-button margin-left"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => navigate(`/edit/${emp._id}`)}
                                        className="button muted-button margin-left"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(emp._id)}
                                        className="button muted-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default List