import React, { Fragment, useEffect, useState } from "react";
import UpdateEmployee from "./UpdateEmployee";
import * as colours from "../colours";


const EmployeeForm = () => {
    const [employees, setEmployees] = useState([]);

    const deleteEmployee = async (id) => {
        try {
            const deleteEmployee = await fetch(`http://localhost:5000/employees/${id}`, {
                method: "DELETE"
            });

            setEmployees(employees.filter(employee => employee.employeeid !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    const getEmployees = async () => {
        try {
            const response = await fetch("http://localhost:5000/employees");
            const jsonData = await response.json();

            setEmployees(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getEmployees();
    }, []);

    return (
    <Fragment>       
    <table className="table mt-5 text-center">
        <thead>
        <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Certification Year</th>
        </tr>
        </thead>
        <tbody>
            {employees.map((employee) => (
                <tr key={employee.employeeid}>
                    <td> {employee.employeeid} </td>
                    <td> {employee.name} </td>
                    <td> {employee.certificationyear} </td>
                    <td>
                        <button className="btn btn-danger" style={{ backgroundColor: colours.DARK_BROWN, border: "none" }} onClick={() => deleteEmployee(employee.employeeid)}> Delete </button>
                    </td>
                    <td>
                        <UpdateEmployee employee = {employee} />
                    </td>
                </tr>
            )) }
        </tbody>
    </table>
    </Fragment>
)};

export default EmployeeForm;