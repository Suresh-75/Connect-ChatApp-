import { useEffect, useState } from "react";
import img from "./assets/output-onlinepngtools.png";
import FormLogin from "./components/FormLogin";
import ToastBar from "./components/ToastBar";
function Login() {
  const [err, setErr] = useState("");
  useEffect(
    function () {
      if (err != "") {
        var timeoutId = setTimeout(() => {
          setErr("");
        }, 2500);
      }
      return () => clearTimeout(timeoutId);
    },
    [err]
  );
  return (
    <>
      {err != "" ? <ToastBar msg={err} setErr={setErr} /> : <></>}
      <div className="absolute  top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <div className=" h-screen flex justify-center items-center px-40">
          <div className="h-[37rem]  rounded-tl-md rounded-bl-md  w-[37rem] ml-10">
            <img
              src={img}
              className=" h-full w-full rounded-tl-md rounded-bl-md "
              alt=""
            />
          </div>
          <div className="h-[37rem] border-2  w-[37rem] rounded-tr-md rounded-br-md flex r-10 bg-white py-7 px-14 flex-col justify-start">
            <h2 className="text-center pb-3 text-4xl font-bold font-Poppins">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                LOGIN
              </span>
            </h2>
            <p className="font-[600] text-2xl pt-2 text-gray-900">
              Welcome back !!
            </p>
            <FormLogin setErr={setErr} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
