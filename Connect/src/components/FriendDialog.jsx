import { Avatar, Badge, Dialog } from "@radix-ui/themes";
import axios from "axios";

function FriendDialog({
  selectedFriend,
  friend,
  setSelcFrnd,
  setUserConvo,
  userConvo,
  setQuery,
  avatarUrl,
}) {
  const handleMessage = async () => {
    try {
      setQuery("");
      const recieverID = friend._id;
      const senderID = localStorage.getItem("userID");
      // console.log(recieverID, " ", senderID);
      //Check if the recieverID is already there in the userConvo arr;
      const res = await axios.post(
        `http://localhost:8000/app/createConvo`,
        {
          senderID,
          recieverID,
        },
        {
          headers: {
            token: localStorage.getItem("jwToken"),
            // userID: localStorage.getItem("userID"),
          },
        }
      );
      console.log(res.data.msg);
      if (res.data.msg == "Conversaiton already exists") {
        console.log(friend);
        setSelcFrnd(friend);
      } else {
        const newM = res.data.msg.members.filter((member) => {
          return member != senderID;
        });
        //check if newM is there in the useConvos
        setUserConvo((v) => {
          return [...v, newM];
        });
        setSelcFrnd(friend);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button
          className={`h-full ${
            selectedFriend.name == friend.name
              ? "dark:bg-zinc-800"
              : "dark:bg-violet-600"
          } text-white bg-violet-500  hover:bg-violet-800 focus:ring-0 focus:ring-none font-medium rounded-lg text-sm p-2 px-3 me-0 mb-0  dark:hover:bg-violet-700 focus:outline-none dark:focus:ring-violet-800`}
        >
          +
        </button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="400px">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-900 dark:border-zinc-950">
          <div className="flex flex-col items-center  py-10">
            <Avatar
              src={avatarUrl}
              radius="full"
              fallback="A"
              size="8"
              color="purple"
            />
            <h5 className="m-1 text-xl font-medium text-gray-900 dark:text-white">
              {friend.name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {friend.AboutMe}
            </span>
            <div className="w-full px-5">
              <p>Tags</p>
              <div className=" flex flex-wrap justify-start">
                <Badge color="orange" className="mr-2 mb-2">
                  In progress
                </Badge>
                <Badge color="blue" className="mr-2 mb-2">
                  In review
                </Badge>
                <Badge color="green" className="mr-2 mb-2">
                  Complete
                </Badge>
                <Badge color="orange" className="mr-2 mb-2">
                  In progress
                </Badge>
                <Badge color="blue" className="mr-2 mb-2">
                  In review
                </Badge>
                <Badge color="green" className="mr-2 mb-2">
                  Complete
                </Badge>
              </div>
            </div>
            <div className="flex mt-4 md:mt-6">
              <Dialog.Close>
                <button
                  onClick={handleMessage}
                  className="py-2 px-4 ms-2 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 focus:ring-0 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Message
                </button>
              </Dialog.Close>
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-violet-700 rounded-lg hover:bg-violet-800 focus:ring-0 focus:outline-none focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">
                Add friend
              </button>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default FriendDialog;
