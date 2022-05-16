import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addEmployee } from "../api/employee";
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

function Add({ setIsAdding }) {
    const [form, setForm] = useState(initialState);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const {
            firstname,
            lastname,
            email,
            phone,
            designation,
            employee_id,
            address
        } = form;
        try {
            if (!firstname || !lastname || !email || !phone || !designation || !employee_id || !address) {
                return errorAlert('Error', 'All fields are required.')
            }

            addEmployee({
                firstname,
                lastname,
                email,
                phone,
                designation,
                employee_id,
                address
            }).then(
                res => {
                    successAlert('Success', 'Data added successfully.')
                    setForm(initialState)
                }
            ).catch(
                err => errorAlert('Error', 'Something went wrong.')
            )
        } catch (err) {
            errorAlert('Error', 'Something went wrong.')
        }
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
            <form onSubmit={handleAdd}>
                <h1>Add Employee</h1>
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
                <label htmlFor="phone">Contact Number</label>
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
                    <input type="submit" value="Add" />
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

export default Add