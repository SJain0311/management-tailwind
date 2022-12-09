import React ,{useState,useEffect}from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

const EmpData = () => {
  const { uid } = useParams();
  const Navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const handleData = async () => {
    try {
      const blog = query(
        collection(db, "employeeData"),
        where("uid", "==", uid),
        where("type", "==", "employee")
      );
      const snapshot = await getDocs(blog);
      const rows = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(rows.uid);
      setRows(rows);

      return rows;
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = (e) => {
    e.preventDefault();
    Navigate("/");
  };

  useEffect(() => {
    handleData();
  }, [uid]);
  return (
    <div>
     <div class="flex flex-col">
  <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full">
          <thead class="bg-gray-200 border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                First Name
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Last Name
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Email
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Gender
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Hobbies
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                City
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Salary
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Department
              </th>
            </tr>
          </thead>
          <tbody>
          {rows.map((row) => (
            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.fname}</td>
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
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {row.dept}
              </td>
            </tr>
           ))}
          </tbody>
        </table>
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
    </div>
  );
};

export default EmpData;
