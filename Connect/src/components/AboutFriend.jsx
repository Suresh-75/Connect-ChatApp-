import { Avatar } from "@radix-ui/themes";
import AccordinaComp from "./AccordinaComp";
import BadgesComp from "./BadgesComp";
import { useEffect, useState } from "react";
import axios from "axios";

function AboutFriend({ selectedFriend }) {
  const [abt, setAbt] = useState("");
  const [avatar, setAvatar] = useState("");
  useEffect(function () {
    (async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/app/users/${selectedFriend._id}`,
        {
          headers: { token: localStorage.getItem("jwToken") },
        }
      );
      setAbt(res.data.userData.AboutMe);
      setAvatar(res.data.avatarUrl);
    })();
  });
  return (
    <div className="h-full flex flex-col pt-5 items-center bg-white rounded-xl  dark:bg-[rgb(14,14,14)]">
      <Avatar
        // src="https://i.pinimg.com/originals/3b/ce/5c/3bce5ccf3b6880ac98fd949e6779b69a.jpg"
        src={avatar}
        radius="full"
        fallback="A"
        size="8"
        color="purple"
        className="shadow-xl dark:shadow-zinc-950"
      />
      <p className="text-2xl my-2 font-[500] mb-0">{selectedFriend.name}</p>
      <span className=" text-base mb-3">{abt}</span>
      <div className="px-5 w-full">
        <p className="font-medium text-lg mb-1">TAGS</p>
        <BadgesComp />
      </div>
      <div className=" h-full w-full mt-2 px-2  dark:bg-[rgb(14,14,14)">
        <AccordinaComp />
      </div>
    </div>
  );
}

export default AboutFriend;
