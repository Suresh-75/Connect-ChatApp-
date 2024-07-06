import { Avatar } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { socket } from "../Socket";
function UserChatsComp({
  user,
  setSelcFrnd,
  selectedFriend,
  setText,
  OnlineUsers,
}) {
  const [userData, setUserData] = useState({});
  const [conID, setConID] = useState();
  const [lastChat, setLastChat] = useState("");
  // const [isChange, setIsChange] = useState("");
  const [byMe, setByMe] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const isOnline = OnlineUsers.indexOf(user[0]) >= 0 ? true : false;
  const avatarUrl = userData.Avatar
    ? `http://localhost:8000/${userData.Avatar}`
    : null;
  useEffect(function () {
    (async () => {
      setIsloading(true);
      const res = await axios.get(`http://localhost:8000/app/users/${user}`, {
        headers: {
          token: localStorage.getItem("jwToken"),
        },
      });
      const data = res.data.userData;
      const frndID = data._id;
      const userID = localStorage.getItem("userID");
      const convoid = await axios.get("http://localhost:8000/app/getConvoID/", {
        headers: {
          token: localStorage.getItem("jwToken"),
          userID,
          frndID,
        },
      });
      setConID(convoid.data.msg[0]._id);
      setUserData(data);
      setIsloading(false);
    })();
  }, []);
  useEffect(
    function () {
      socket.on("lastMessage", ({ senderID, text }) => {
        if (!userData._id) return;
        if (senderID == userData._id) {
          setByMe(false);
          // setIsChange(text);
          setLastChat(text);
        }
      });
    },
    [userData._id]
  );

  useEffect(function () {
    const controller = new AbortController();
    (async () => {
      const lastChat = await axios.get(
        `http://localhost:8000/app/getMsg/${conID}`,

        {
          headers: {
            token: localStorage.getItem("jwToken"),
          },
        },
        { signal: controller.signal }
      );
      const length = lastChat.data.msg.length;
      const senderOfLastMsg = lastChat.data.msg[length - 1]?.senderID;
      if (senderOfLastMsg == localStorage.getItem("userID")) {
        setByMe(true);
      }
      const x = byMe ? " You" : "";
      // console.log(x, ":", lastChat.data.msg[length - 1]?.text);
      if (lastChat.data.msg[length - 1]?.text)
        setLastChat(lastChat.data.msg[length - 1]?.text);
    })();
    return () => {
      controller.abort();
    };
  });
  if (isLoading) {
    return (
      <div
        role="status"
        className="space-y-8 animate-pulse md:space-y-0 md:space-x-3 rtl:space-x-reverse md:flex md:items-center my-2"
      >
        <div className="flex items-center justify-center w-28 h-16 bg-white rounded  dark:bg-gray-700">
          <svg
            className="w-10 h-10 text-violet-100 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="w-full ">
          <div className="h-2 bg-white rounded-full dark:bg-zinc-700 w-[50%] my-2.5"></div>
          <div className="h-2 bg-white  rounded-full dark:bg-zinc-700 mb-2.5"></div>
          <div className="h-2 bg-white  rounded-full dark:bg-zinc-700 w-[100%] my-2.5"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <div
      onClick={() => {
        setText("");
        setSelcFrnd(userData);
      }}
      className={`h-16 ${lastChat ? "flex" : "hidden"}  ${
        userData._id == selectedFriend._id
          ? "bg-white dark:bg-zinc-900"
          : "bg-violet-50  dark:bg-zinc-950"
      } my-2 rounded-lg justify-between items-center  hover:bg-white active:bg-white dark:hover:bg-zinc-900  hover:cursor-pointer  dark:border-zinc-700`}
    >
      <div className=" flex justify-start w-full">
        <Avatar
          radius="small"
          fallback={userData.name ? userData.name[0] : ""}
          size="5"
          color="purple"
          src={avatarUrl}
        />

        <div className=" mx-3 py-2 flex flex-col  w-full">
          <div className="flex items-center w-full  justify-between">
            <p className=" font-[500] text-lg ">{userData.name} </p>
            {isOnline ? (
              <div className=" h-2 w-2 rounded-full  bg-green-500 ml-2  animate-pulse"></div>
            ) : (
              <></>
            )}
          </div>
          <span className=" font-light text-sm truncate max-w-28 text-ellipsis">{`${
            byMe ? "You: " + lastChat : "" + lastChat
          }`}</span>
        </div>
      </div>
      {/* <div className=""></div> */}
    </div>
  );
}

export default UserChatsComp;
