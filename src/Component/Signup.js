import React from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link, useParams, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import { async } from "@firebase/util";

const LoginSchema = (values) => {
  const errors = {};
  if (!values.salary) {
    errors.salary = "This Field is Required";
  } else if (!/^[0-9]+$/i.test(values.salary)) {
    errors.salary = "Only Number Is Accepted";
  }
  if (!values.fname) {
    errors.fname = "This Field is Required";
  } else if (values.fname.length > 15) {
    errors.fname = "Must be 15 characters or less";
  }

  if (!values.lname) {
    errors.lname = "This Field is Required";
  } else if (values.lname.length > 20) {
    errors.lname = "Must be 20 characters or less";
  }

  if (!values.city) {
    errors.city = "This Field is Required";
  }
  if (!values.type) {
    errors.type = "This Field is Required";
  }

  if (!values.email) {
    errors.email = "This Field is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "This Field is Required";
  }
  if (!values.gender) {
    errors.gender = "This Field is Required";
  }
  if (!values.hobbies) {
    errors.hobbies = "This Field is Required";
  }
  return errors;
};

function Signup(props) {
  const Navigate = useNavigate();
  const createUserDocument = async (user, values) => {
    if (!user) return;

    const { email } = values;
    const { password } = values;
    const { fname } = values;
    const { lname } = values;
    const { city } = values;
    const { salary } = values;
    const { gender } = values;
    const { hobbies } = values;
    const { type } = values;
    const uid = user.user.uid;
    console.log(user);

    await setDoc(doc(db, `employeeData`, `${user?.user.uid}`), {
      email,
      password,
      fname,
      lname,
      city,
      salary,
      gender,
      hobbies,
      uid,
      type ,
        createdAt: new Date(),
    });
  };
  

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fname: "",
      lname: "",
      city: "",
      salary: "",
      gender: "",
      hobbies: "",
      type: "",
    },
    validate: LoginSchema,
    onSubmit: async (formik) => {
      await createUserWithEmailAndPassword(auth, formik.email, formik.password)
        .then((res) => {
          Navigate("/");
          if (res) {
            createUserDocument(res, formik);
            console.log("res", res, "hi", formik.values);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  });

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form>
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <div className=" mb-3  flex flex-row justify-start space-x-2">
              <div className="h-7 w-3 bg-[#0DE6AC]"></div>
              <div className="w-2  text-center font-sans text-xl font-bold">
                <h1>Signup</h1>
              </div>
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded"
                name="fname"
                placeholder="Full Name"
                id="fname"
                label="Enter First Name"
                value={formik.values.fname}
                onChange={formik.handleChange}
              />
              {formik.errors.fname && (
                <div style={{ color: "#0DE6AC" }}>{formik.errors.fname}</div>
              )}
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded "
                name="lname"
                placeholder="Last Name"
                id="lname"
                label="Enter Last Name"
                value={formik.values.lname}
                onChange={formik.handleChange}
              />
              {formik.errors.lname && (
                <div style={{ color: "#0DE6AC" }}>{formik.errors.lname}</div>
              )}
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded"
                name="email"
                placeholder="Email"
                id="email"
                label="Enter Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <div style={{ color: "#0DE6AC" }}>{formik.errors.email}</div>
              )}
            </div>
            <div className="mb-2">
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded"
                name="password"
                placeholder="Password"
                id="password"
                label="Enter password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <div style={{ color: "#0DE6AC" }}>{formik.errors.password}</div>
              )}
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded"
                name="city"
                id="city"
                placeholder="city"
                label="Enter City"
                value={formik.values.city}
                onChange={formik.handleChange}
              />
              {formik.errors.city && (
                <div style={{ color: "#0DE6AC" }}>{formik.errors.city}</div>
              )}
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded"
                name="salary"
                id="salary"
                placeholder="Salary"
                label="Enter Salary"
                value={formik.values.salary}
                onChange={formik.handleChange}
              />
              {formik.errors.salary && (
                <div style={{ color: "#0DE6AC" }}>{formik.errors.salary}</div>
              )}
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded"
                name="hobbies"
                id="hobbies"
                placeholder="Hobbies"
                label="Enter Hobbies"
                value={formik.values.hobbies}
                onChange={formik.handleChange}
              />
              {formik.errors.hobbies && (
                <div style={{ color: "#0DE6AC" }}>{formik.errors.hobbies}</div>
              )}
            </div>
            <div className="mb-2">
              <div
                className="flex justify-start"
                name="gender"
                onChange={formik.handleChange}
              >
                <label className="ml-1">Gender</label>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input form-check-input appearance-none
                 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600
                  checked:border-blue-600 focus:outline-none transition duration-200 mt-1
                   align-top bg-no-repeat bg-center bg-contain float-left ml-2 cursor-pointer"
                    type="radio"
                    id="inlineRadio1"
                    name="gender"
                    value="female"
                  />
                  <label
                    className="form-check-label inline-block text-gray-800 ml-1"
                    for="inlineRadio10"
                  >
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 
                bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none
                 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left ml-1 cursor-pointer"
                    type="radio"
                    id="inlineRadio2"
                    name="gender"
                    value="male"
                  />
                  <label
                    className="form-check-label inline-block text-gray-800 ml-1"
                    for="inlineRadio20"
                  >
                    Male
                  </label>
                </div>
              </div>
              {formik.errors.gender && (
                <div style={{ color: "#0DE6AC" }}>{formik.errors.gender}</div>
              )}
            </div>
            <div>
              <div>
                <div
                  className="flex justify-start mt-5"
                  name="type"
                  onChange={formik.handleChange}
                >
                  <label className="ml-1">Job Description</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input form-check-input appearance-none
                 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600
                  checked:border-blue-600 focus:outline-none transition duration-200 mt-1
                   align-top bg-no-repeat bg-center bg-contain float-left ml-2 cursor-pointer"
                      type="radio"
                      name="type"
                      id="inlineRadio3"
                      value="employee"
                    />
                    <label
                      className="form-check-label inline-block text-gray-800 ml-1"
                      for="inlineRadio10"
                    >
                      Employee
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 
                bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none
                 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left ml-1 cursor-pointer"
                      type="radio"
                      name="type"
                      id="inlineRadio4"
                      value="manager"
                    />
                    <label
                      className="form-check-label inline-block text-gray-800 ml-1"
                      for="inlineRadio20"
                    >
                      Manager
                    </label>
                  </div>
                </div>
                {formik.errors.type && (
                  <div style={{ color: "#0DE6AC" }}>{formik.errors.type}</div>
                )}
              </div>
              <div className=" flex justify-center mt-5">
                <button
                  type="submit"
                  className="w-72 border bg-[#0DE6AC] p-2 font-sans"
                  onClick={formik.handleSubmit}
                >
                  Signup
                </button>
              </div>
            </div>

            <div className="text-center text-sm text-grey-dark mt-4">
              <div className="text-grey-dark mt-6">
                Already have an account?
                <div
                  className="no-underline border-b border-blue text-blue"
                >
                    <Link to="/">
                  Log in
                  </Link>
                </div>
                .
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
