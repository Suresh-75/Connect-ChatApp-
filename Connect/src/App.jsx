import FindFriends from "./components/FindFriends";
import AboutFriend from "./components/AboutFriend";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "./Socket";
import ChatSection from "./components/ChatSection";
import axios from "axios";
function App() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("email");
  });
  const [selectedFriend, setSelcFrnd] = useState({});
  const [avatar, setAva] = useState("");
  const [isAbout, setIsAbout] = useState(false);
  const [conversationID, setConversationID] = useState();
  const [text, setText] = useState("");
  const scroll = useRef(null);
  // const [allLastChats, setAllLastChats] = useState([]);
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  useEffect(function () {
    (async () => {
      const userID = localStorage.getItem("userID");
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/app/users/${userID}`,
        {
          headers: { token: localStorage.getItem("jwToken") },
        }
      );
      setAva(res.data.avatarUrl);
      setUserName(res.data.userData.name);
    })();
  });
  useEffect(
    function () {
      (async () => {
        if (selectedFriend._id == null) return;
        const userID = localStorage.getItem("userID");
        // console.log(selectedFriend);
        const frndID = selectedFriend._id;

        const data = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/app/getConvoID/`,
          {
            headers: {
              token: localStorage.getItem("jwToken"),
              userID,
              frndID,
            },
          }
        );
        // console.log("conversationID:", data.data);
        setConversationID(data.data.msg[0]?._id);
        setText("");
      })();
    },
    [selectedFriend]
  );
  useEffect(function () {
    if (!email) {
      navigate("/login");
    }
  });

  //socket
  useEffect(function () {
    socket.connect();
    const userID = localStorage.getItem("userID");
    socket.emit("addUser", userID);
  }, []);

  useEffect(
    function () {
      socket.emit("message", {
        senderID: localStorage.getItem("userID"),
        recieverID: selectedFriend._id,
        text,
      });
    },
    [selectedFriend._id, text]
  );

  return (
    <div className="h-screen flex  justify-center items-center   dark:bg-zinc-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-30%,rgba(120,119,198,0.2),rgba(255,255,255,0))]">
      <FindFriends
        darkModeHandler={darkModeHandler}
        userName={userName}
        email={email}
        setSelcFrnd={setSelcFrnd}
        selectedFriend={selectedFriend}
        setText={setText}
        scroll={scroll}
        pp={avatar}
      />
      {selectedFriend.name != null ? (
        <ChatSection
          conversationID={conversationID}
          selectedFriend={selectedFriend}
          setIsAbout={setIsAbout}
          setText={setText}
          scroll={scroll}
          pp={avatar}
        />
      ) : (
        <div className=" h-full w-screen flex flex-col justify-center items-center">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-white from-violet-400 dark:bg-gradient-to-r dark:to-zinc-900 dark:from-violet-400">
            CONNECT
          </h1>
        </div>
      )}
      {isAbout ? (
        <div className="h-full  bg-violet-50  w-[40%]  rounded-tl-3xl rounded-bl-3xl py-7 px-7  dark:bg-zinc-950">
          <AboutFriend selectedFriend={selectedFriend} />{" "}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
