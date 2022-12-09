import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { query, collection, getDocs, where } from "firebase/firestore";

const Login = (props) => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;
      const q = query(collection(db, "employeeData"), where("uid", "==", uid));
      const docs = await getDocs(q);
      const type = docs.docs[0].data().type;
      console.log(type);
      if (type) {
        type === "manager" ? Navigate(`/manager`) : Navigate(`/empData/${uid}`);
      } else {
        return "No user Found";
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mx-auto my-36 flex h-[300px] w-[350px] flex-col border-2 bg-white text-black shadow-xl">
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="mx-8 mt-7 mb-1 flex flex-row justify-start space-x-2">
          <div className="h-7 w-3 bg-[#0DE6AC]"></div>
          <div className="w-3 text-center font-sans text-xl font-bold">
            <h1>Login</h1>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <input
            className="my-2 w-72 border p-2"
            type="email"
            name="email"
            value={email}
            required
            onChange={(e) => {
              handleEmail(e);
            }}
            placeholder="Username"
          />
          <input
            className="my-2 w-72 border p-2"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            required
            onChange={(e) => {
              handlePassword(e);
            }}
          />
        </div>
        <div className="my-2 flex justify-center">
          <button
            className="w-72 border bg-[#0DE6AC] p-2 font-sans"
            type="submit"
          >
            Login
          </button>
        </div>
        <div className="mx-7 my-3 flex justify-between text-sm font-semibold">
        

          <div>
          
            <h1>
            <p>Create New Account{'  '}
              <Link to="/signup" className="underline ">{'   '}Signup</Link></p>
            </h1>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
