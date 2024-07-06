import { socket } from "../Socket";
import axios from "axios";
import { useEffect, useState } from "react";
import EmojiPicker from "./EmojiPicker";

function ChatBox({
  setMsg,
  msg,
  conversationID,
  setAllMsg,
  setText,
  selectedFriend,
}) {
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const text = msg;
      setText(text);
      const senderID = localStorage.getItem("userID");
      const res = await axios.post(
        "http://localhost:8000/app/createMsg",
        {
          text,
          senderID,
          conversationID,
        },
        {
          headers: {
            token: localStorage.getItem("jwToken"),
          },
        }
      );
      const msgdata = await axios.get(
        `http://localhost:8000/app/getMsg/${conversationID}`,
        {
          headers: {
            token: localStorage.getItem("jwToken"),
          },
        }
      );
      setMsg("");
      // console.log(msgdata.data.msg);
      setAllMsg(msgdata.data.msg);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(
    function () {
      const length = msg.trim().length;
      if (length == 0) {
        socket.emit("Typing", {
          senderID: localStorage.getItem("userID"),
          recieverID: selectedFriend._id,
          isTyping: "No",
        });
      } else {
        socket.emit("Typing", {
          senderID: localStorage.getItem("userID"),
          recieverID: selectedFriend._id,
          isTyping: "Yes",
        });
      }
    },
    [msg, selectedFriend]
  );
  return (
    <div className="h-14 my-4 mx-4 bg-violet-50 rounded-3xl flex items-center justify-between px-3 dark:bg-zinc-950">
      <form
        onSubmit={(e) => handleSubmit(e)}
        action=""
        className="flex items-center justify-center w-full p-4 pl-2"
      >
        <label htmlFor="doc" className="cursor-pointer">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            height="1.1rem"
            width="1.1rem"
            // {...props}
            color="#93339d"
          >
            <path
              fill="currentColor"
              d="M14 0a5 5 0 015 5v12a7 7 0 11-14 0V9h2v8a5 5 0 0010 0V5a3 3 0 10-6 0v12a1 1 0 102 0V6h2v11a3 3 0 11-6 0V5a5 5 0 015-5z"
            />
          </svg>
          <input type="file" id="doc" name="doc" accept="png, jpg" hidden />
        </label>
        <EmojiPicker setMsg={setMsg} />
        <input
          placeholder="Type..."
          className="bg-violet-50 w-full p-2 focus:outline-none text-base dark:bg-zinc-950"
          type="text"
          required
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <button type="submit">
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1.35rem"
            width="1.35rem"
            color="#93339d"
          >
            <path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
