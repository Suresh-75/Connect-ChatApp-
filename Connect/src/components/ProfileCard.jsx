import { Avatar } from "@radix-ui/themes";
import OptionsPop from "./OptionsPop";
function ProfileCard({ darkModeHandler, userName, email, pp }) {
  return (
    <div className=" bg-white flex p-2  py-3 my-3 rounded-lg justify-between items-center  dark:bg-zinc-900">
      <div className=" flex justify-start ">
        <div className=" relative">
          <Avatar
            // src="https://cdn.imgchest.com/files/p7bwcgxgdm7.png"
            src={pp ? pp : ""}
            radius="full"
            fallback="A"
            size="4"
            color="purple"
          />
          <div className="absolute top-[70%] left-[70%] bg-green-600  border-[3px] rounded-full border-white dark:border-zinc-900 h-4 w-4"></div>
          {/* <svg
            className="absolute top-[55%] left-[55%]"
            viewBox="0 0 16 16"
            fill="green"
            height="2rem"
            width="2rem"
          >
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8z" />
          </svg> */}
        </div>

        <div className=" mx-3 flex flex-col">
          <p className=" font-[600] flex text-lg">{userName}</p>
          <span className=" font-[400] text-sm">{email}</span>
        </div>
      </div>
      <OptionsPop darkModeHandler={darkModeHandler} />
    </div>
  );
}

export default ProfileCard;
