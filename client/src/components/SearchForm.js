import React, { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import * as colours from "../colours";
import Box from "@mui/material/Box";

const darkGreen = colours.DARK_GREEN;

const SearchForm = () => {
  const [table, setTable] = useState("");
  const [tableValues, setTableValues] = useState([]);
  const [attribute, setAttribute] = useState("");
  const [optNum, setOptNum] = useState("");

  // // Input Search
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  // Table selection
  const [showWinemakers, setShowWinemakers] = useState(false);
  const [showViticulturists, setShowViticulturists] = useState(false);
  const [showGrapes, setShowGrapes] = useState(false);
  const [showWineBatch, setShowWineBatch] = useState(false);

  /* Populate tables */
  const getTableValues = async () => {
    try {
      const response = await fetch(`http://localhost:5000/search/${table}`);
      const jsonData = await response.json();
      setTableValues(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTableValues();
  }, [table]);

  // Update table based on year range
  const handleSelect = (e) => {
    setOptNum(e);
    setAttribute("range");
  };

  useEffect(() => {
    updateTableValues();
  }, [optNum]);

  const updateTableValues = async () => {
    let response = await fetch(`http://localhost:5000/search/${table}`);
    try {
      if (attribute === "range")
        response = await fetch(
          `http://localhost:5000/search/${table}/${optNum}`
        );
      const jsonData = await response.json();
      setTableValues(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Update table selection based on search input
  const onSubmitForm = async (e) => {
    e.preventDefault();
    let response = await fetch(`http://localhost:5000/search/${table}`);
    try {
      if (value1 !== "")
        response = await fetch(
          `http://localhost:5000/search/${table}/${attribute}/${value1}`
        );
      else if (value2 !== "")
        response = await fetch(
          `http://localhost:5000/search/${table}/${attribute}/${value2}`
        );
      // else if (value2 !== '' && !Number.isNaN(value2)) response = await fetch(`http://localhost:5000/search/${table}/${attribute}/string/${value2}`);
      const jsonData = await response.json();
      setTableValues(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div>
        <Button
          className="m-3"
          variant="primary"
          style={{ backgroundColor: darkGreen, border: "none" }}
          onClick={() => {
            setTable("winemaker");
            setShowWinemakers(true);
            setShowViticulturists(false);
            setShowGrapes(false);
            setShowWineBatch(false);
          }}
        >
          Winemakers
        </Button>
        <Button
          className="m-3"
          variant="primary"
          style={{ backgroundColor: darkGreen, border: "none" }}
          onClick={() => {
            setTable("viticulturist");
            setShowWinemakers(false);
            setShowViticulturists(true);
            setShowGrapes(false);
            setShowWineBatch(false);
          }}
        >
          Viticulturists
        </Button>
        <Button
          className="m-3"
          variant="primary"
          style={{ backgroundColor: darkGreen, border: "none" }}
          onClick={() => {
            setTable("grapes_makes");
            setShowWinemakers(false);
            setShowViticulturists(false);
            setShowGrapes(true);
            setShowWineBatch(false);
          }}
        >
          Grapes
        </Button>
        <Button
          className="m-3"
          variant="primary"
          style={{ backgroundColor: darkGreen, border: "none" }}
          onClick={() => {
            setTable("winebatch");
            setShowWinemakers(false);
            setShowViticulturists(false);
            setShowGrapes(false);
            setShowWineBatch(true);
          }}
        >
          Wine Batch
        </Button>
      </div>
      <br />
      <div>
        {showWinemakers ? (
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <label className="m-3">
                Search by Employee ID:
                <input
                  type="text"
                  className="form-control"
                  value={value1}
                  onChange={(e) => {
                    setAttribute("employeeid");
                    setValue1(e.target.value);
                    setValue2("");
                  }}
                />
                <br />
                <Button
                  variant="primary"
                  style={{ backgroundColor: darkGreen, border: "none" }}
                  onClick={(e) => onSubmitForm(e)}
                >
                  Search
                </Button>
              </label>
              <label className="m-3">
                Search by Name:
                <input
                  type="text"
                  className="form-control"
                  value={value2}
                  onChange={(e) => {
                    setAttribute("name");
                    setValue1("");
                    setValue2(e.target.value);
                  }}
                />
                <br />
                <Button
                  variant="primary"
                  style={{ backgroundColor: darkGreen, border: "none" }}
                  onClick={(e) => onSubmitForm(e)}
                >
                  Search
                </Button>
              </label>
              <label className="m-3">
                Search by Certification Year:
                <DropdownButton
                  title="Select Range"
                  id="certificationyear"
                  style={{ color: darkGreen, border: "none" }}
                  onSelect={handleSelect}
                >
                  <Dropdown.Item eventKey="opt1"> {`<= 1999`} </Dropdown.Item>
                  <Dropdown.Item eventKey="opt2"> {`2000-2009`} </Dropdown.Item>
                  <Dropdown.Item eventKey="opt3"> {`2010-2019`} </Dropdown.Item>
                  <Dropdown.Item eventKey="opt4"> {`>= 2020`} </Dropdown.Item>
                </DropdownButton>
              </label>
              <Button
                className="m-3 mt-5"
                variant="primary"
                type="submit"
                onClick={getTableValues}
                style={{
                  backgroundColor: colours.MED_GREEN,
                  border: "none",
                }}
              >
                Reset Table
              </Button>
            </Box>
            <table className="table mt-5 text-center">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Certification Year</th>
                </tr>
              </thead>
              <tbody>
                {tableValues.map((employee) => (
                  <tr key={employee.employeeid}>
                    <td> {employee.employeeid} </td>
                    <td> {employee.name} </td>
                    <td> {employee.certificationyear} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>

      <div>
        {showViticulturists ? (
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <label className="m-3">
                Search by Employee ID:
                <input
                  type="text"
                  className="form-control"
                  value={value1}
                  onChange={(e) => {
                    setAttribute("employeeid");
                    setValue1(e.target.value);
                    setValue2("");
                  }}
                />
                <br />
                <Button
                  variant="primary"
                  style={{ backgroundColor: darkGreen, border: "none" }}
                  onClick={(e) => onSubmitForm(e)}
                >
                  Search
                </Button>
              </label>
              <label className="m-3">
                Search by Name:
                <input
                  type="text"
                  className="form-control"
                  value={value2}
                  onChange={(e) => {
                    setAttribute("name");
                    setValue1("");
                    setValue2(e.target.value);
                  }}
                />
                <br />
                <Button
                  variant="primary"
                  style={{ backgroundColor: darkGreen, border: "none" }}
                  onClick={(e) => onSubmitForm(e)}
                >
                  Search
                </Button>
              </label>
              <label className="m-3">
                Search by Years of Experience:
                <DropdownButton
                  title="Select Range"
                  id="yearsofExperience"
                  style={{ color: darkGreen, border: "none" }}
                  onSelect={handleSelect}
                >
                  <Dropdown.Item eventKey="opt5"> {`<= 2`} </Dropdown.Item>
                  <Dropdown.Item eventKey="opt6"> {`3 - 5`} </Dropdown.Item>
                  <Dropdown.Item eventKey="opt7"> {`> 5`} </Dropdown.Item>
                </DropdownButton>
              </label>
              <Button
                className="m-3 mt-5"
                variant="primary"
                type="submit"
                onClick={getTableValues}
                style={{
                  backgroundColor: colours.MED_GREEN,
                  border: "none",
                }}
              >
                Reset Table
              </Button>
            </Box>
            <table className="table mt-5 text-center">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Years of Experience</th>
                </tr>
              </thead>
              <tbody>
                {tableValues.map((employee) => (
                  <tr key={employee.employeeid}>
                    <td> {employee.employeeid} </td>
                    <td> {employee.name} </td>
                    <td> {employee.yearsofexperience} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>

      <div>
        {showGrapes ? (
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <label className="m-3">
                Search by Cluster ID:
                <input
                  type="text"
                  className="form-control"
                  value={value1}
                  onChange={(e) => {
                    setAttribute("clusterid");
                    setValue1(e.target.value);
                    setValue2("");
                  }}
                />
                <br />
                <Button
                  variant="primary"
                  style={{ backgroundColor: darkGreen, border: "none" }}
                  onClick={(e) => onSubmitForm(e)}
                >
                  Search
                </Button>
              </label>
              <label className="m-3">
                Search by Batch ID:
                <input
                  type="text"
                  className="form-control"
                  value={value2}
                  onChange={(e) => {
                    setAttribute("batchid");
                    setValue1("");
                    setValue2(e.target.value);
                  }}
                />
                <br />
                <Button
                  variant="primary"
                  style={{ backgroundColor: darkGreen, border: "none" }}
                  onClick={(e) => onSubmitForm(e)}
                >
                  Search
                </Button>
              </label>
              <label className="m-3">
                Search by Wine Type:
                <DropdownButton
                  title="Select Type"
                  id="type"
                  style={{ color: darkGreen, border: "none" }}
                  onSelect={handleSelect}
                >
                  <Dropdown.Item eventKey="opt8"> {`Reds`} </Dropdown.Item>
                  <Dropdown.Item eventKey="opt9"> {`Whites`} </Dropdown.Item>
                </DropdownButton>
              </label>
              <label className="m-3">
                Search by Date Picked:
                <DropdownButton
                  title="Select Year"
                  id="type"
                  style={{ color: darkGreen, border: "none" }}
                  onSelect={handleSelect}
                >
                  <Dropdown.Item eventKey="opt10"> {`<= 1999`} </Dropdown.Item>
                  <Dropdown.Item eventKey="opt11">
                    {" "}
                    {`2000-2009`}{" "}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="opt12">
                    {" "}
                    {`2010-2019`}{" "}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="opt13"> {`>= 2020`} </Dropdown.Item>
                </DropdownButton>
              </label>
              <Button
                className="m-3 mt-5"
                variant="primary"
                type="submit"
                onClick={getTableValues}
                style={{
                  backgroundColor: colours.MED_GREEN,
                  border: "none",
                }}
              >
                Reset Table
              </Button>
            </Box>
            <table className="table mt-5 text-center">
              <thead>
                <tr>
                  <th>Cluster ID</th>
                  <th>Batch ID</th>
                  <th>Type</th>
                  <th>Date Picked</th>
                </tr>
              </thead>
              <tbody>
                {tableValues.map((grape) => (
                  <tr key={grape.clusterid}>
                    <td> {grape.clusterid} </td>
                    <td> {grape.batchid} </td>
                    <td> {grape.type} </td>
                    <td> {grape.datepicked} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>

      <div>
        {showWineBatch ? (
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <label className="m-3">
                Search by Batch ID:
                <input
                  type="text"
                  className="form-control"
                  value={value1}
                  onChange={(e) => {
                    setAttribute("batchid");
                    setValue1(e.target.value);
                    setValue2("");
                  }}
                />
                <br />
                <Button
                  variant="primary"
                  style={{ backgroundColor: darkGreen, border: "none" }}
                  onClick={(e) => onSubmitForm(e)}
                >
                  Search
                </Button>
              </label>
              <label className="m-3">
                Search by Fermentation Time:
                <DropdownButton
                  title="Select Range"
                  id="type"
                  style={{ border: "none" }}
                  onSelect={handleSelect}
                >
                  <Dropdown.Item eventKey="opt14">
                    {" "}
                    {`< 20 mins`}{" "}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="opt15">
                    {" "}
                    {`20 - 30 mins`}{" "}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="opt16">
                    {" "}
                    {`> 30 mins`}{" "}
                  </Dropdown.Item>
                </DropdownButton>
              </label>
              <Button
                className="m-3 mt-5"
                variant="primary"
                type="submit"
                onClick={getTableValues}
                style={{
                  backgroundColor: colours.MED_GREEN,
                  border: "none",
                }}
              >
                Reset Table
              </Button>
            </Box>
            <table className="table mt-5 text-center">
              <thead>
                <tr>
                  <th>Batch ID</th>
                  <th>Fermentation Time (Mins)</th>
                </tr>
              </thead>
              <tbody>
                {tableValues.map((batch) => (
                  <tr key={batch.batchid}>
                    <td> {batch.batchid} </td>
                    <td> {batch.fermentationtime} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default SearchForm;