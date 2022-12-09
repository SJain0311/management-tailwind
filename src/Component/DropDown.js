import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";


function DropDown({ data }) {
  const [depts, setDepts] = useState("");
  const handleChange = (e, uid) => {
    console.log("e", e, uid);
    updateDept(uid, e.target.value);
    setDepts(e.target.value);
  };
  //dept ===e.target.value
  const updateDept = async (uid, depts) => {
    const blogRef = doc(db, `employeeData`, `${uid}`);
    await updateDoc(blogRef, {
      dept: depts,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // console.log(data);
    setDepts(data.dept);
  }, [data.dept]);
  return (
   <div>
    <div class="flex justify-center">
  <div class="mb-1 xl:w-96">
    <select  className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0

      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
      value={depts}
      onChange={(e) => {
        handleChange(e, data.id);
      }}
      aria-label="Default select example">
        <option value={"HR"}>HR</option>
        <option value={"Sales"}>Sales</option>
        <option value={"IT"}>IT</option>
    </select>

</div>
   </div>
   </div>
  );
}

export default DropDown;