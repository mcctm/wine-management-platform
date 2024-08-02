import React, { Fragment, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import * as colours from "../colours";

const darkGreen = colours.DARK_GREEN;
const medGreen = colours.MED_GREEN;

export default function WineTypeForm() {
  const [allWineTypeInfo, setWineTypeInfo] = useState([]);

  const updateWineTypeForm = async () => {
    try {
      let response = await fetch("http://localhost:5000/winebottlescorenested");
      const jsonData = await response.json();
      console.log(jsonData);
      setWineTypeInfo(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getWineTypeInfo = async () => {
    try {
      const response = await fetch("http://localhost:5000/winebatchtype");
      const jsonData = await response.json();
      console.log(jsonData);
      setWineTypeInfo(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getWineTypeInfo();
  }, []);

  return (
    <Fragment>
      <Fragment>
        <div>
          <Button
            variant="primary"
            type="submit"
            onClick={updateWineTypeForm}
            style={{
              backgroundColor: darkGreen,
              border: "none",
              marginRight: "20px",
            }}
          >
            Get Wine Type
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={getWineTypeInfo}
            style={{
              backgroundColor: medGreen,
              border: "none",
            }}
          >
            Reset Table
          </Button>
        </div>
      </Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Wine Type</th>
            <th>Alcohol Level</th>
          </tr>
        </thead>
        <tbody>
          {allWineTypeInfo.map((info) => (
            <tr key={[info.batchid]}>
              <td> {info.batchid} </td>
              <td> {info.winetype} </td>
              <td> {Math.round((info.alcohollevel || info.avg) * 10) / 10} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}
