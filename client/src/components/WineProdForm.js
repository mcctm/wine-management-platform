import React, { Fragment, useState, useEffect } from "react";
import { components } from "react-select";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import * as colours from "../colours";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export const options = [
  { value: "batchid", label: "Batch ID" },
  { value: "winetype", label: "Wine Type" },
  { value: "alcohollevel", label: "Alcohol Level" },
  { value: "yeastid", label: "Yeast ID" },
  { value: "yeasttype", label: "Yeast Type" },
  { value: "fermentationtime", label: "Fermentation Time" },
];

export let attributeArray = [];

export default function WineProdForm() {
  const [allWineProdInfo, setWineProdInfo] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const onSubmit = async (e) => {
    attributeArray = [];
    selectedOptions.forEach((element) => {
      attributeArray.push(element.value);
    });
    updateWineProdForm();
  };

  const onSelection = (options) => {
    setSelectedOptions(options);
  };

  const updateWineProdForm = async () => {
    let response = await fetch("http://localhost:5000/wineProduction");
    try {
      if (attributeArray.length === 1) {
        response = await fetch(
          `http://localhost:5000/wineProduction/${attributeArray[0]}`
        );
      } else if (attributeArray.length === 2) {
        response = await fetch(
          `http://localhost:5000/wineProduction/${attributeArray[0]}/${attributeArray[1]}`
        );
      } else if (attributeArray.length === 3) {
        response = await fetch(
          `http://localhost:5000/wineProduction/${attributeArray[0]}/${attributeArray[1]}/${attributeArray[2]}`
        );
      }
      const jsonData = await response.json();
      setWineProdInfo(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getWineProdInfo = async () => {
    try {
      const response = await fetch("http://localhost:5000/wineProduction");
      const jsonData = await response.json();
      setWineProdInfo(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getWineProdInfo();
  }, []);

  return (
    <Fragment>
      <Fragment>
        <div>
          <span
            class="d-inline-block"
            data-toggle="popover"
            data-trigger="focus"
            style={{ width: "800px", paddingRight: "20px", paddingTop: "20px" }}
          >
            <Select
              options={options}
              onChange={onSelection}
              isMulti
              placeholder="Select at most 3 attributes"
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option,
              }}
            />
          </span>
          <Button 
          variant="primary" 
          type="submit" 
          onClick={onSubmit}
          style={{ backgroundColor: colours.DARK_GREEN, border: "none" }}
          >
            Search
          </Button>
        </div>
      </Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Wine Type</th>
            <th>Alcohol Level</th>
            <th>Yeast ID</th>
            <th>Yeast Type</th>
            <th>Fermentation Time</th>
          </tr>
        </thead>
        <tbody>
          {allWineProdInfo.map((info) => (
            <tr key={[info.batchid, info.yeastid]}>
              <td> {info.batchid} </td>
              <td> {info.winetype} </td>
              <td> {info.alcohollevel} </td>
              <td> {info.yeastid} </td>
              <td> {info.yeasttype} </td>
              <td> {info.fermentationtime} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}
