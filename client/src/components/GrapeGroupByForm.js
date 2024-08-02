import React, { Fragment, useState} from "react";
import Button from 'react-bootstrap/Button';
import Select from "react-select";
import * as colours from "../colours";

export const options = [
    {value: 'all', label: 'Show all'},
    {value: 'spring', label: 'Spring'},
    {value: 'summer', label: 'Summer'},
    {value: 'fall', label: 'Fall'},
    {value: 'winter', label: 'Winter'},
]

export let input = "";

export default function GrapeGroupByForm() {

    const [allGroupByInfo, setGroupByInfo] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const onSubmit = async(e) => {
        input = selectedOptions.value;
        updateForm(input);
    }

    const onSelection = (options) => {
        setSelectedOptions(options);
    };

    const updateForm = async () => {
        try {
            let response = await fetch("http://localhost:5000/grapeProduction/countClustersBySeasons/all");
            if (input != ""){
                response = await fetch(`http://localhost:5000/grapeProduction/countClustersBySeasons/${input}`);
            }
            const jsonData = await response.json();
            setGroupByInfo(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

  return (
        <Fragment>
            <Fragment>
                <div>
                    <span
                            class="d-inline-block"
                            data-toggle="popover"
                            data-trigger="focus"
                            style={{width: '800px', paddingRight: '20px', paddingTop: '20px'}}
                    >
                        <Select 
                        options={options}
                        onChange={onSelection}
                        />
                    </span>
                    <Button 
                    variant="primary" 
                    type="submit" 
                    onClick={onSubmit}
                    style={{ backgroundColor: colours.DARK_GREEN, border: "none" }}
                    >
                        Count
                    </Button>
                </div>
            </Fragment>
            <table className="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Season</th>
                    <th>Cluster count</th>
                </tr>
                </thead>
                <tbody>
                    {Array.isArray(allGroupByInfo) ? allGroupByInfo.map((info) => (
                        <tr key={[info.season]}>
                        <td> {info.season} </td>
                        <td> {info.count} </td>
                        </tr>
                    )) : [allGroupByInfo].map((info) => (
                        <tr key={[info.season]}>
                            <td> {info.season} </td>
                            <td> {info.count} </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </Fragment>
  );
}