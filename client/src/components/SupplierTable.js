import React, { Fragment, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import * as colours from "../colours";

const SupplierTable = ({batchid}) => {
    const [items, setItems] = useState([]);

    const getSupplierInfo = async () => {
        try {
            const response = await fetch(`http://localhost:5000/suppliers/${batchid}`);
            const jsonData = await response.json();
            setItems(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getSupplierInfo();
      }, []);

    return (
        <Fragment>
            <Typography
                textAlign="center"
                variant="h6"
                sx={{
                    mr:2,
                    color: colours.DARK_BROWN
                }}
            >
                Supplier Information: 
            </Typography> 
            <table className="table text-center">
                <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Phone Number</th>
                    <th>Wood Type Sold</th>
                    <th>Barrel Size</th> 
                </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.batchid}>
                            <td> {item.companyname} </td>
                            <td> {item.phonenumber} </td>
                            <td> {item.woodtype} </td>
                            <td> {item.size} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default SupplierTable;