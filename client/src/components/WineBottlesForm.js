import React, { Fragment, useState, useEffect } from "react";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import Button from "react-bootstrap/Button";
import * as colours from "../colours";

const darkGreen = colours.DARK_GREEN;
const medGreen = colours.MED_GREEN;

export default function WineBottleForm() {
  const [allWineBottleInfo, setWineBottleInfo] = useState([]);

  const deleteBottle = async (id) => {
    try {
      const deleteBottle = await fetch(
        `http://localhost:5000/winebottle/${id}`,
        {
          method: "DELETE",
        }
      );

      setWineBottleInfo(
        allWineBottleInfo.filter(
          (allWineBottleInfo) => allWineBottleInfo.bottleid !== id
        )
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateWineBottleForm = async () => {
    console.log("hit me");
    try {
      let response = await fetch("http://localhost:5000/winebottlescorehaving");
      const jsonData = await response.json();
      console.log(jsonData);
      setWineBottleInfo(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getWineProdInfo = async () => {
    try {
      const response = await fetch("http://localhost:5000/qualitytests-wine");
      const jsonData = await response.json();
      setWineBottleInfo(jsonData);
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
          <Button
            variant="primary"
            type="submit"
            onClick={updateWineBottleForm}
            style={{
              backgroundColor: darkGreen,
              border: "none",
              marginRight: "20px",
            }}
          >
            Get Average Scores
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={getWineProdInfo}
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
            <th>Bottle ID</th>
            <th>Batch ID</th>
            <th>Test ID</th>
            <th>Tannins</th>
            <th>Acidity</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {allWineBottleInfo.map((info) => (
            <tr key={[info.bottleid, info.testid]}>
              <td> {info.bottleid} </td>
              <td> {info.batchid} </td>
              <td> {info.testid} </td>
              <td> {info.tannins} </td>
              <td> {info.acidity} </td>
              <td> {Math.round((info.score || info.avg) * 10) / 10} </td>
              <td>
                <Button
                  className="btn btn-danger"
                  onClick={() => deleteBottle(info.bottleid)}
                  style={{
                    backgroundColor: colours.DARK_BROWN,
                    border: "none",
                  }}
                >
                  Delete Bottle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}
