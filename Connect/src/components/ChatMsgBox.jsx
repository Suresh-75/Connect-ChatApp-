import { Avatar } from "@radix-ui/themes";
function ChatMsgBox({ msg, selectedFriend, pp }) {
  const date = new Date(msg.createdAt);
  let hrs = date.getHours();
  let mins = date.getMinutes();
  if (hrs < 12) {
    hrs = "0" + hrs;
  }
  if (mins < 12) {
    mins = "0" + mins;
  }
  const avatarUrl = selectedFriend.Avatar
    ? `${import.meta.env.VITE_BASE_URL}/${selectedFriend.Avatar}`
    : null;
  return (
    <div
      className={`flex ${
        selectedFriend._id == msg.senderID ? "" : "flex-row-reverse"
      }  items-start gap-2.5 mb-3 `}
    >
      <Avatar
        // src="https://i.pinimg.com/originals/3b/ce/5c/3bce5ccf3b6880ac98fd949e6779b69a.jpg"
        src={selectedFriend._id == msg.senderID ? avatarUrl : pp}
        radius="full"
        fallback="A"
        size="3"
        color="purple"
      />
      <div
        className={`flex flex-col gap-1 w-max  ${
          selectedFriend._id == msg.senderID ? "" : "items-end"
        }  `}
      >
        <div
          className={`flex items-center space-x-2 rtl:space-x-reverse ${
            selectedFriend._id == msg.senderID ? "" : "flex-row-reverse"
          }`}
        >
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {selectedFriend._id == msg.senderID ? selectedFriend.name : "You"}
          </span>
          <span
            className={`text-sm font-normal text-gray-500 dark:text-gray-400 ${
              selectedFriend._id == msg.senderID ? "" : "pr-2"
            }`}
          >
            {hrs + ":" + mins}
          </span>
        </div>
        <div className=" w-max flex flex-row-reverse max-w-96 text- leading-1.5 p-2 px-3 border-gray-200 bg-violet-200 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <p
            className={`text-base ${
              selectedFriend._id == msg.senderID ? "" : "text-end"
            } font-large w-full text-gray-900 dark:text-white `}
          >
            {msg.text}
          </p>
        </div>
        {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span> */}
      </div>
    </div>
  );
}

export default ChatMsgBox;
