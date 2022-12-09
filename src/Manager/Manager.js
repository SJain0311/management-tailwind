import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  startAt,
  startAfter,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import DropDown from "../Component/DropDown";
import {
  Button,
  Typography,
  Container,
  Radio,
  FormControl,
  Select,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

const Manager = (props) => {
  const { formData } = props;
  const Navigate = useNavigate();
  const [depts, setDepts] = useState("");
  const [rows, setRows] = useState([]);
  const [querys, setQuerys] = useState(null);

  const handleData = async () => {
    const empData = query(
      collection(db, "employeeData"),
      where("type", "==", "employee")
    );
    const snapshot = await getDocs(empData);
    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRows(result);
    console.log(rows);
    return result;
  };

  const handleQuery = async (e) => {
    setQuerys(e.target.value);
    let check = e.target.value;
    if (check == "1") {
      console.log("1");
      const queryRef = query(
        collection(db, "employeeData"),
        where("type", "==", "employee"),
        where("dept", "==", "HR"),
        orderBy("salary")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(checkQuery);
      setRows(checkQuery);
      // setcheck(checkQuery);
      return checkQuery;
    } else if (check == "2") {
      console.log("2");
      const queryRef = query(
        collection(db, "employeeData"),
        where("type", "==", "employee"),
        where("dept", "==", "It"),
        orderBy("salary")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("checkQuery", checkQuery);
      console.log("snapshot", snapshot);
      setRows(checkQuery);
    } else if (check == "3") {
      console.log("3");
      const queryRef = query(
        collection(db, "employeeData"),
        where("city", "==", "Surat"),
        where("dept", "==", "It"),
        where("type", "==", "employee")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("check", checkQuery);
      setRows(checkQuery);
    } else if (check == "4") {
      console.log("4");
      const queryRef = query(
        collection(db, "employeeData"),
        where("type", "==", "employee"),
        where("dept", "==", "It"),
        orderBy("city"),
        startAt(`A`)
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(snapshot.docs);
      setRows(checkQuery);
      // setQuerys(checkQuery);
      // return snapshot.docs;
    } else if (check == "5") {
      console.log("5");
      const queryRef = query(
        collection(db, "employeeData"),
        where("type", "==", "employee"),
        where("dept", "==", "Sales")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(checkQuery);
      setRows(checkQuery);
      // setQuerys(checkQuery);
      return snapshot.docs;
    }
  };
  const logOut = (e) => {
    e.preventDefault();
    Navigate("/");
  };

  useEffect(() => {
    handleData();
  }, []);
  return (
    <div>
      <div className="my-10 mx-10">
        <Typography variant="h6">Filter</Typography>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(e) => handleQuery(e)}
          value={querys}
        >
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="HR departments with Max salary"
          />

          <FormControlLabel
            value="2"
            control={<Radio />}
            label="IT departments with Min salary"
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label=" IT departments and location is Surat city"
          />
          <FormControlLabel
            value="4"
            control={<Radio />}
            label=" City name is starting from A"
          />
          <FormControlLabel
            value="5"
            control={<Radio />}
            label=" Sales departments and descending order of employee name"
          />
        </RadioGroup>
      </div>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-gray-200 border-b">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Hobbies
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      City
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Salary
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Department
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.fname}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {row.lname}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {row.email}
                      </td>

                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {row.gender}
                      </td>

                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {row.hobbies}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {row.city}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {row.salary}
                      </td>
                      <DropDown data={row}></DropDown>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* <button
          onClick={logOut}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          LOGOUT
        </button> */}
      </div>
      <Link  to="/">
        <button

          className="
                              border border-primary
                              py-2
                              px-6
                              text-primary
                              inline-block
                              rounded
                              hover:bg-primary hover:text-white
                              "
        >
          Sign Up
        </button>
      </Link>
    </div>
  );
};

export default Manager;
