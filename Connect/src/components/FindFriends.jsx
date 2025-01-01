import SearchBar from "./SearchBar";
import FriendCard from "./FriendCard";
import ProfileCard from "./ProfileCard";
import { useEffect, useState } from "react";
import axios from "axios";
import UserChatsComp from "./UserChatsComp";
import { socket } from "../Socket";
function FindFriends({
  darkModeHandler,
  userName,
  email,
  setSelcFrnd,
  selectedFriend,
  setText,
  scroll,
  pp,
}) {
  const [friends, SetFriends] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [userConvo, setUserConvo] = useState([]);
  const [query, setQuery] = useState("");
  const [OnlineUsers, setOnlineUsers] = useState([]);
  useEffect(function () {
    (async () => {
      const userID = localStorage.getItem("userID");
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/app/getConv/${userID}`,
        {
          headers: {
            token: localStorage.getItem("jwToken"),
          },
        }
      );
      const userConvoFriendsID = res.data.msg.map((friend) => {
        return friend.members.filter((member) => {
          return member != userID;
        });
      });
      setUserConvo(userConvoFriendsID);
    })();
  }, []);

  useEffect(
    function () {
      socket.on("addToConvo", ({ senderID, text }) => {
        let isThere = userConvo.some((conv) => {
          // console.log(conv[0], " ", senderID);
          return conv == senderID;
        });
        // console.log("isthere", isThere);
        let res = [...userConvo];
        if (isThere) {
          res = [...userConvo];
        } else {
          res = [...userConvo, senderID];
        }
        setUserConvo(res);
      });
    },
    [userConvo]
  );

  useEffect(
    function () {
      socket.on("OnlineUsers", (users) => {
        setOnlineUsers(users);
      });
    },
    [userConvo]
  );
  return (
    <div className="  bg-violet-50 h-full w-[30%] rounded-tr-3xl rounded-br-3xl py-5 px-6 dark:bg-zinc-950">
      <SearchBar
        query={query}
        setQuery={setQuery}
        SetFriends={SetFriends}
        setNotFound={setNotFound}
      />
      {/* <p className="pt-3 py-1 font-semibold">Results</p> */}
      <div className=" h-[75%] overflow-y-auto no-scrollbar">
        {notFound ? (
          <p>Not found</p>
        ) : (
          friends.map((friend) => {
            return (
              <FriendCard
                setUserConvo={setUserConvo}
                userConvo={userConvo}
                key={friend.name}
                friend={friend}
                setSelcFrnd={setSelcFrnd}
                selectedFriend={selectedFriend}
                setQuery={setQuery}
              />
            );
          })
        )}
        {query.length == 0 ? (
          userConvo?.map((user) => {
            return (
              <UserChatsComp
                OnlineUsers={OnlineUsers}
                setText={setText}
                selectedFriend={selectedFriend}
                key={user._id}
                setSelcFrnd={setSelcFrnd}
                user={user}
                scroll={scroll}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
      <div>
        <ProfileCard
          pp={pp}
          userName={userName}
          email={email}
          darkModeHandler={darkModeHandler}
        />
      </div>
    </div>
  );
}

export default FindFriends;
