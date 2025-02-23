import React, { Component, useState } from "react";
import { db2 } from "../firebase.config";
import { collection, query, where, onSnapshot, documentId, setDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';


export default function Example() {

    const [country, setCountry] = useState('France');
    const [region, setRegion] = useState('');
    var DBcountry = []
    const [test, setTest] = useState([])
    const [test1, setTest1] = useState([])
    const [optionSelected, setOptionSelected] = useState([]);
    const [select, setSelect] = useState('France');
    const notifySuccess = () => toast.success("Regions updated with success");


    //---------plugin functions

    function selectCountry(val) {
        setCountry(val);
    }

    function selectRegion(val) {
        setRegion(val);
    }

    //---------get selected cities

    useEffect(() => {
        setOptionSelected([])
        const q = query(
            collection(db2, "regions"),
            where(documentId(), "==", country)

        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setOptionSelected(doc.data().optionSelected)
            });
        });
    }, [country]);

    //---------get countries  

    useEffect(() => {
        DBcountry = []
        const q = query(
            collection(db2, "regions")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (!DBcountry.includes(doc.data().country)) {
                    DBcountry.push(doc.data().country)
                }
            });
        });
        setTest(DBcountry)
    }, []);

    //----------get selected cities based on selected country

    useEffect(() => {
        const q = query(
            collection(db2, "regions"),
            where(documentId(), "==", select)

        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setTest1(doc.data().optionSelected)
            });
        });
    }, [select]);


    //-----------save data

    const saveData = async () => {
        optionSelected.push(region)
        if (optionSelected.includes(region)) {
            await setDoc(doc(db2, "regions", country), {
                country: country,
                optionSelected: optionSelected,
                
            });
            notifySuccess()
        }

    };

    //----------delete city

    const deleteCity = async (e) => {
        var index = optionSelected.indexOf(e)
        if (index !== -1) {
            optionSelected.splice(index, 1);
        }
        await setDoc(doc(db2, "regions", country), {
            country: country,
            optionSelected: optionSelected
        });
        notifySuccess()

    };

    function handleRegionChange(event) {
        setRegion(event.target.value);
    }

    return (
        <html lang="en">
            <head>
                <link href="assets/css/sb-admin-2.min.css" rel="stylesheet" />
                <link
                    href="assets/vendor/datatables/dataTables.bootstrap4.min.css"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
                ></link>
            </head>
            <body>
                <h1 class="h3 mb-2 text-gray-800">List Regions</h1>

                <ToastContainer />

                <CountryDropdown value={country} onChange={(val) => selectCountry(val)} />
                
                <input type="text" className="mx-2" country={country} onChange={handleRegionChange}/>

                <span
                    class="d-inline-block"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-content="Please selecet account(s)"
                >
                </span>
                <button class="btn btn-info " onClick={saveData}>+ Add</button>
                <div class="card shadow mb-4">


                    <div class="card-body">

                        <div class="table-responsive">
                            <table
                                class="table table-bordered"
                                id="dataTable"
                                width="100%"
                                cellspacing="0"
                            >
                                <thead>
                                    <tr>
                                        <th>City</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {optionSelected.map((e) => {
                                        return (
                                            <tr>

                                                <td>{e}</td>

                                                <td>
                                                    {" "}
                                                    <button
                                                        class=" mx-1 btn btn-danger"
                                                        onClick={() => deleteCity(e)}
                                                    >
                                                        {" "}
                                                        <i class="bi bi-trash3"></i>
                                                    </button>

                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <h3>testing -------------------</h3>
                <div>

                    <select value={select} onChange={(e) => setSelect(e.target.value)} >
                        {test.map(fbb =>
                            <option  >{fbb}</option>
                        )};
                    </select>
                </div>


                <select  >
                    {test1.map(b =>
                        <option key={b.key} value={b.key}>{b}</option>
                    )};
                </select>
            </body>
        </html>
    );
}

