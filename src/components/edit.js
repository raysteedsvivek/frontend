import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from "../api/employee";
import { successAlert, errorAlert } from "../services/swal";

const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    designation: "",
    address: "",
    employee_id: ""
}

function Edit() {
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


    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        updateEmployee(form)
            .then(res => {
                successAlert('Updated', 'Data has been updated.');
            }).catch(err => {
                errorAlert('Error', 'Something went wrong.');
            })
    }

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
            <form onSubmit={handleUpdate}>
                <h1>Edit Employee</h1>
                <label htmlFor="firstname">First Name</label>
                <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={handleChange}
                />
                <label htmlFor="lastname">Last Name</label>
                <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />

                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                />
                <label htmlFor="desigantion">Designation</label>
                <input
                    id="designation"
                    type="text"
                    name="designation"
                    value={designation}
                    onChange={handleChange}
                />
                <label htmlFor="employee_id">Employee Id</label>
                <input
                    id="employee_id"
                    type="text"
                    name="employee_id"
                    value={employee_id}
                    onChange={handleChange}
                />
                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleChange}
                />
                <div className="margin-top">
                    <input type="submit" value="Update" />
                    <input
                        className="muted-button margin-top"
                        type="button"
                        value="Cancel"
                        onClick={() => navigate('/')}
                    />
                </div>
            </form>
        </div>
    );
}

export default Edit