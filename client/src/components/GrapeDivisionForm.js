import React, { Fragment, useState} from "react";
import Button from 'react-bootstrap/Button';
import * as colours from "../colours";

export default function GrapeDivisionForm() {

    const [allViticulturistInfo, setViticulturistInfo] = useState([]);

    const onSubmit = async(e) => {
        try {
            const response = await fetch("http://localhost:5000/grapeProduction/grownAllClusters");
            const jsonData = await response.json();
            setViticulturistInfo(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

  return (
    <Fragment>
    <Fragment>
        <div>
            <Button 
            variant="primary"
            type="submit"
            onClick={onSubmit}
            style={{ backgroundColor: colours.DARK_GREEN, border: "none" }}
        >
            Find out here
        </Button>
        </div>
    </Fragment>
    <table className="table mt-5 text-center">
        <thead>
        <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
        </tr>
        </thead>
        <tbody>
            {Array.isArray(allViticulturistInfo) ? allViticulturistInfo.map((info) => (
                <tr key={[info.employeeid]}>
                <td> {info.employeeid} </td>
                <td> {info.name} </td>
                </tr>
            )) : [allViticulturistInfo].map((info) => (
                <tr key={[info.employeeid]}>
                    <td> {info.employeeid} </td>
                    <td> {info.name} </td>
                </tr>
            )) }
        </tbody>
    </table>
</Fragment>
  );
}