import React from 'react'
import { useHistory } from 'react-router-dom'

function EmployeeList() {
    let history = useHistory();
    return (
        <div>
            <button onClick={()=> {
                history.push('/employee/new')
            }}>New Employee</button>
        </div>
    )
}

export default EmployeeList