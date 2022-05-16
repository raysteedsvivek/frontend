import React from 'react'
import { useNavigate } from 'react-router-dom';
import List from './list';

function EmployeeList() {
    const navigate = useNavigate();

    return (
        <div className='container'>
            <header>
                <h1>Employee Details</h1>
                <div className="margin-top margin-bottom">
                    <button onClick={() => navigate('/add')} className='round-button'>
                        Add Employee
                    </button>
                </div>
            </header>

            {/* Employee List */}
            <List />
        </div>
    )
}

export default EmployeeList;