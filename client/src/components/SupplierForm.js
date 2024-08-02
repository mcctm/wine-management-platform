import React, { useEffect, useState, Fragment } from "react";
import { Typography } from "@mui/material";
import * as colours from "../colours";

export const Dropdown = (props) => (
  <div className="form-group">
    <strong>{props.batchid}</strong>
    <select
      className="form-control"
      name="{props.batchid}"
      onChange={props.onChange}
    >
      <option defaultValue>Select {props.name}</option>
      {props.options.map((batch, index) => (
        <option key={index} value={batch.batchid}>
          {batch.batchid}
        </option>
      ))}
    </select>
  </div>
);

export let currBatchId = 0;

export default function SupplierForm() {
  // Dropdown
  const [collection, setCollection] = useState([]);
  const [value, setValue] = useState("");

  const getBatchIds = async () => {
    try {
      const response = await fetch("http://localhost:5000/suppliers");
      const jsonData = await response.json();
      setCollection(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getBatchIds();
  }, []);

  const onChange = async (event) => {
    setValue(event.target.value);
    currBatchId = event.target.value;
  };

  // Supplier Table
  const [items, setItems] = useState([]);

  const getSupplierInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/suppliers/${currBatchId}`
      );
      const jsonData = await response.json();
      setItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getSupplierInfo();
  }, [value]);

  return (
    <div className="container mt-4">
      <Dropdown name={value} options={collection} onChange={onChange} />
      <br />
      <Fragment>
        <Typography
          variant="h6"
          sx={{
            ml: "5px",
            color: colours.DARK_BROWN,
          }}
        >
          Supplier and Barrel Information:
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
    </div>
  );
}
