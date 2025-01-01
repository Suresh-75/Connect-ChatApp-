import ChatNav from "./ChatNav";
import ChatBox from "./ChatBox";
import ChatMsgBox from "./ChatMsgBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../Socket";
import { Spinner } from "@radix-ui/themes";
function ChatSection({
  selectedFriend,
  setIsAbout,
  conversationID,
  setText,
  scroll,
  pp,
}) {
  const [msg, setMsg] = useState("");
  const [allMsg, setAllMsg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  useEffect(
    function () {
      setAllMsg([]);
      setIsTyping(false);
    },
    [selectedFriend]
  );
  useEffect(
    function () {
      socket.on("getMessage", ({ senderID, text }) => {
        const newMsg = { senderID, text, createdAt: Date.now() };
        // console.log(selectedFriend._id, " ", senderID);
        // console.log(newMsg);
        if (selectedFriend._id == senderID) {
          // console.log("add");
          setAllMsg([...allMsg, newMsg]);
        } else {
          // console.log("not add");
          setAllMsg([...allMsg]);
        }
      });
    },
    [allMsg, selectedFriend._id]
  );
  useEffect(
    function () {
      socket.on("Typing", (msg) => {
        console.log("typer:", msg.typer);
        console.log("sel:", selectedFriend._id);
        if (msg.isTyping == "Yes" && msg.typer == selectedFriend._id) {
          setIsTyping(true);
        }
        if (msg.isTyping == "No" || msg.typer != selectedFriend._id) {
          setIsTyping(false);
        }
      });
    },
    [selectedFriend]
  );
  useEffect(
    function () {
      setAllMsg([]);
      (async () => {
        setAllMsg([]);
        setIsLoading(true);
        const msgdata = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/app/getMsg/${conversationID}`,
          {
            headers: {
              token: localStorage.getItem("jwToken"),
            },
          }
        );
        setAllMsg(msgdata.data.msg);
        setIsLoading(false);
      })();
    },
    [conversationID]
  );
  useEffect(() => {
    scroll.current.lastElementChild?.scrollIntoView();
  });
  return (
    <div className=" h-full w-screen flex flex-col justify-between ">
      <ChatNav
        isTyping={isTyping}
        selectedFriend={selectedFriend}
        setIsAbout={setIsAbout}
      />
      <div
        key={1}
        className=" h-[80%] px-5 overflow-y-scroll no-scrollbar"
        ref={scroll}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full ">
            <Spinner size="3" />
          </div>
        ) : (
          allMsg.map((msg) => {
            return (
              <ChatMsgBox
                selectedFriend={selectedFriend}
                key={msg._id}
                msg={msg}
                pp={pp}
              />
            );
          })
        )}
      </div>
      <ChatBox
        msg={msg}
        setAllMsg={setAllMsg}
        setMsg={setMsg}
        conversationID={conversationID}
        setText={setText}
        selectedFriend={selectedFriend}
      />
    </div>
  );
}

export default ChatSection;
