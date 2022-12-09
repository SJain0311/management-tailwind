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
      <div className="w-full lg:w-12/12 px-4">
        <div
          className="relative justify-center w-full item-center  flex my-4"
          // name="gender"
          onChange={(e) => handleQuery(e)}
          value={querys}
        >
          <div className="flex items-center mr-6  ">
            <div class="form-check form-check-inline">
              <input
                id="default-radio-1"
                type="radio"
                value="1"
                name="default-radio"
                className=" h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-radio-1"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                HR departments with Max salary
              </label>
            </div>
          </div>
          <div className="flex items-center mr-6  ">
            <div class="form-check form-check-inline">
              <input
                id="default-radio-2"
                type="radio"
                value="2"
                name="default-radio"
                className=" h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-radio-2"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                IT departments with Min salary
              </label>
            </div>
          </div>
          <div className="flex items-center mr-6  ">
            <div class="form-check form-check-inline">
              <input
                id="default-radio-3"
                type="radio"
                value="3"
                name="default-radio"
                className=" h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-radio-3"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                IT Departments and location is Surat city
              </label>
            </div>
          </div>
          <div className="flex items-center mr-6  ">
            <input
              id="default-radio-4"
              type="radio"
              value="4"
              name="default-radio"
              className=" h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-4"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              City name is starting from A
            </label>
          </div>
          <div className="flex items-center mr-6  ">
            <div class="form-check form-check-inline">
              <input
                id="default-radio-5"
                type="radio"
                value="5"
                name="default-radio"
                className=" h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-radio-5"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Sales departments and descending order of employee name
              </label>
            </div>
          </div>
        </div>
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
      </div>
      <button
        onClick={logOut}
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
        Logout
      </button>
    </div>
  );
};

export default Manager;
