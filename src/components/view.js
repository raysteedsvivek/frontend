import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById } from "../api/employee";
import { errorAlert } from "../services/swal";

const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    designation: "",
    address: "",
    employee_id: ""
}

function View() {
    const [form, setForm] = useState(initialState);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getEmployeeById(id).then(
            res => setForm(res)
        ).catch(
            err => errorAlert('Error', 'Something went wrong.')
        )
    }, [id])

    const {
        firstname,
        lastname,
        email,
        phone,
        designation,
        address,
        employee_id
    } = form;
    return (
        <div className="small-container">
            <h1>View Employee</h1>

            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td>Employee ID</td>
                        <td>{employee_id}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{`${firstname} ${lastname}`}</td>
                    </tr>
                    <tr>
                        <td>Email ID</td>
                        <td>{email}</td>
                    </tr>
                    <tr>
                        <td>Contact Number</td>
                        <td>{phone}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{address}</td>
                    </tr>
                    <tr>
                        <td>Designation</td>
                        <td>{designation}</td>
                    </tr>
                </tbody>
            </table>
            <div className="margin-top text-center">
                <input
                    className="muted-button margin-top"
                    type="button"
                    value="Back"
                    onClick={() => navigate('/')}
                />
            </div>
        </div>
    );
}

export default View