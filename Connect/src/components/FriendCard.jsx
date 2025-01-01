import { Avatar } from "@radix-ui/themes";
import FriendDialog from "./FriendDialog";

function FriendCard({
  friend,
  setSelcFrnd,
  selectedFriend,
  setUserConvo,
  userConvo,
  setQuery,
}) {
  const avatarUrl = friend.Avatar
    ? `${import.meta.env.VITE_BASE_URL}/${friend.Avatar}`
    : null;
  return (
    <div
      className={`h-16 bg-white flex  my-1 ${
        selectedFriend.name == friend.name
          ? " bg-violet-100 dark:bg-violet-900"
          : "dark:bg-zinc-900"
      } rounded-lg justify-between items-center  hover:bg-violet-50 dark:hover:bg-violet-900  hover:cursor-pointer  dark:border-zinc-700`}
    >
      <div className=" flex justify-start">
        <Avatar
          radius="small"
          fallback={friend.name[0]}
          size="5"
          color="purple"
          src={avatarUrl}
        />
        <div className=" mx-3 py-2 flex flex-col">
          <p className=" font-[600] text-lg">{friend.name}</p>
          <span className=" font-light text-sm">{friend.email}</span>
        </div>
      </div>
      <div className="">
        <FriendDialog
          setQuery={setQuery}
          setUserConvo={setUserConvo}
          userConvo={userConvo}
          setSelcFrnd={setSelcFrnd}
          selectedFriend={selectedFriend}
          friend={friend}
          avatarUrl={avatarUrl}
        />
      </div>
    </div>
  );
}

export default FriendCard;
