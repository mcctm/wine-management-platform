import React, { Fragment, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as colours from "../colours";

const darkGreen = colours.DARK_GREEN;

const UpdateEmployee = ({ employee }) => {
    const [employeeId, setEmployeeId] = useState(employee.employeeid);
    const [name, setName] = useState(employee.name);
    const [certificationYear, setCertificationYear] = useState(employee.certificationyear);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {employeeId, name, certificationYear};
            const response = await fetch(`http://localhost:5000/employees/${employee.employeeid}`,
                {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
            window.location = "/employees"
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <Button variant="primary" style={{ backgroundColor: darkGreen, border: "none" }} onClick={handleShow}>
                Update
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Update Winemaker</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                            <label>
                                Employee ID: {employeeId}
                            </label>
                            <label>
                                Name:
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={name} 
                                    onChange={e => setName(e.target.value)}/>
                            </label>
                            <label>
                                Certification Year:
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={certificationYear} 
                                    onChange={e => setCertificationYear(e.target.value)}/>
                            </label>
                        </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" style={{ color: colours.DARK_GREEN, backgroundColor: colours.DARK_BROWN, border: "none" }} onClick={e => onSubmitForm(e)}>
                        Update
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default UpdateEmployee;