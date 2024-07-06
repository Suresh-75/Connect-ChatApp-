import { Avatar, Badge } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SaveDialog from "./components/SaveDialog";
import ToastBar from "./components/ToastBar";
// import { CalendarDemo } from "./components/CalendarDemo";

function SettingsPage() {
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [edit, setEdit] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [preview, setPreview] = useState("");
  const [dob, setDob] = useState("");
  const [logToast, setLogToast] = useState("");
  async function handleUpdate() {
    const oldEmail = localStorage.getItem("email");
    const userID = localStorage.getItem("userID");
    const name = fname + " " + lname;
    if (oldEmail != email) {
      setLogToast("Logging you out");
    }
    const isChanged = "xxx";
    if (preview == avatar && avatar != "") {
      var obj = {
        aboutMe,
        name,
        email,
      };
    } else {
      var obj = {
        aboutMe,
        name,
        email,
        avatar: preview,
        isChanged,
      };
    }

    const res = await axios.post(
      `http://localhost:8000/app/UpdateProfile/${userID}`,
      obj,
      {
        headers: {
          token: localStorage.getItem("jwToken"),
          "x-device-id": "stuff",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    localStorage.setItem("name", name);
    if (oldEmail != email) {
      setTimeout(() => {
        localStorage.clear();
        navigate("/login");
      }, 1500);
    }
  }
  useEffect(function () {
    (async () => {
      const userID = localStorage.getItem("userID");
      const res = await axios.get(`http://localhost:8000/app/users/${userID}`, {
        headers: {
          token: localStorage.getItem("jwToken"),
        },
      });
      // console.log(res.data.userData);
      setAvatar(res.data.avatarUrl);
      setPreview(res.data.avatarUrl);
      setEmail(res.data.userData.email);
      setfName(res.data.userData.name.split(" ")[0]);
      setlName(res.data.userData.name.split(" ")[1]);
      setAboutMe(res.data.userData.AboutMe);
    })();
  }, []);
  const navigate = useNavigate();
  const ref = useRef(null);
  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen  bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)] dark:bg-neutral-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      {logToast ? <ToastBar msg={logToast} setErr={setLogToast} /> : <></>}
      <svg
        width="4rem"
        height="4rem"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute my-3 mx-2 transition text-violet-900 hover:text-pink-950    dark:text-neutral-500 cursor-pointer dark:hover:text-neutral-700"
        onClick={() => {
          navigate("/connect");
        }}
      >
        <path
          d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
      <div className="px-10  h-[100vh] flex items-center justify-center ">
        <div className=" w-[40%]">
          <div className="flex-col justify-center items-center ">
            <div className=" w-max m-auto ">
              <Avatar
                radius="full"
                fallback={fname[0]}
                size="8"
                color="red"
                src={
                  preview && preview != avatar
                    ? URL.createObjectURL(preview)
                    : avatar
                }
              />
            </div>
            <div className=" w-max  flex items-center m-auto my-2">
              <label
                htmlFor="doc"
                className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Change
                <input
                  ref={ref}
                  type="file"
                  id="doc"
                  name="avatar"
                  accept="png, jpg"
                  hidden
                  onChange={(e) => {
                    setPreview(e.target.files[0]);
                  }}
                />
              </label>
              <button
                // type="submit"
                onClick={() => {
                  ref.current.value = null;
                  setPreview("");
                  setAvatar("");
                }}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
              >
                Remove
              </button>
            </div>
          </div>

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <input
                disabled={edit}
                value={fname}
                onChange={(e) => {
                  setfName(e.target.value);
                }}
                type="text"
                id="first_name"
                className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
                  edit
                    ? "text-gray-500 dark:text-gray-500"
                    : " text-gray-900  dark:text-white"
                } dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <input
                disabled={edit}
                value={lname}
                onChange={(e) => {
                  setlName(e.target.value);
                }}
                type="text"
                id="last_name"
                className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
                  edit
                    ? "text-gray-500 dark:text-gray-500"
                    : " text-gray-900  dark:text-white"
                } dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="Doe"
                required
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
              >
                Email
              </label>
              <input
                disabled={edit}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                id="company"
                className={`bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
                  edit
                    ? "text-gray-500 dark:text-gray-500"
                    : " text-gray-900  dark:text-white"
                } dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="Flowbite"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date of Birth
              </label>
              {/* <input
                disabled={edit}
                type="tel"
                id="phone"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
                  edit ? "dark:text-gray-500" : "dark:text-white"
                } dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="123-45-678"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                // required
              /> */}
              {/* <CalendarDemo edit={edit} setDob={setDob} dob={dob} /> */}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="abt"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              About/Bio
            </label>
            <input
              disabled={edit}
              value={aboutMe}
              onChange={(e) => {
                setAboutMe(e.target.value);
              }}
              type="text"
              id="abt"
              className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
                edit
                  ? "text-gray-500 dark:text-gray-500"
                  : " text-gray-900  dark:text-white"
              } dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              disabled={edit}
              htmlFor="tag"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tags
            </label>
            <div className="flex items-center justify-between">
              <input
                disabled={edit}
                type="text"
                id="tag"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Add Tags.."
                // required
              />
              <div className="w-[70%]">
                <Badge size="3" color="pink" className="mr-1 mb-1">
                  In progress
                </Badge>
                <Badge size="3" color="green" className="mr-1 mb-1">
                  In progress
                </Badge>
                <Badge size="3" color="blue" className="mr-1 mb-1">
                  In progress
                </Badge>
                <Badge size="3" color="pink" className="mr-1 mb-1">
                  In progress
                </Badge>
                <Badge size="3" color="green" className="mr-1 mb-1">
                  In progress
                </Badge>
                <Badge size="3" color="blue" className="mr-1 mb-1">
                  In progress
                </Badge>
              </div>
            </div>
          </div>
          <div className=" flex justify-end">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setEdit((v) => {
                  return !v;
                });
              }}
              className=" mr-2 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
              {edit ? (
                "Edit"
              ) : (
                <svg
                  width="1.2rem"
                  height="1.2rem"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
            {/* <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button> */}
            <SaveDialog handleUpdate={handleUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
