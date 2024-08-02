import React, { Fragment, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as colours from "../colours";

const darkGreen = colours.DARK_GREEN;
const darkBrown = colours.DARK_BROWN;

const InsertEmployee = () => {
    const [name, setName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [certificationYear, setCertificationYear] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { employeeId, name, certificationYear };
            const response = await fetch("http://localhost:5000/employees", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/employees";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <Button variant="primary" style={{ backgroundColor: darkBrown, border: "none" }} onClick={handleShow}>
                Create new
            </Button>

            <Modal show={show} onHide={handleClose} style={{ color: darkGreen, border: "none" }}>
                <Modal.Header closeButton>
                <Modal.Title>Update Winemaker</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                    <label>
                        Employee ID:
                        <input 
                            type="text" 
                            className="form-control" 
                            value={employeeId} 
                            onChange={e => setEmployeeId(e.target.value)}/>
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
                    <Button variant="primary" style={{ backgroundColor: darkBrown, border: "none" }} onClick={e => onSubmitForm(e)}>
                        Create new
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default InsertEmployee;