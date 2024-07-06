import { Avatar, IconButton, Tooltip } from "@radix-ui/themes";

function ChatNav({ selectedFriend, setIsAbout, isTyping }) {
  const avatarUrl = selectedFriend.Avatar
    ? `http://localhost:8000/${selectedFriend.Avatar}`
    : null;
  return (
    <div className="h-14 my-4 mx-4 bg-violet-50 rounded-3xl flex items-center justify-between px-3 dark:bg-zinc-950">
      <div className="flex items-center ">
        <Avatar
          src={avatarUrl}
          radius="full"
          fallback="A"
          size="3"
          color="purple"
        />
        <p className="px-2 font-medium text-lg ">{selectedFriend.name}</p>

        {isTyping ? (
          <div className="flex items-center justify-between w-6 max-w-sm animate-pulse ">
            <div className="h-1.5 bg-violet-500 rounded-full dark:bg-zinc-400  w-1.5 "></div>
            <div className="h-1.5 bg-violet-500 rounded-full dark:bg-zinc-400  w-1.5 "></div>
            <div className="h-1.5 bg-violet-500 rounded-full dark:bg-zinc-400  w-1.5 "></div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex w-26 h-full items-center justify-evenly mr-3">
        <Tooltip content="Call">
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1.1rem"
            width="1.1rem"
            className="mx-2 text-violet-400 dark:text-zinc-400 hover:text-violet-600 hover:cursor-pointer dark:hover:cursor-pointer dark:hover:text-zinc-100"
          >
            <path d="M391 480c-19.52 0-46.94-7.06-88-30-49.93-28-88.55-53.85-138.21-103.38C116.91 298.77 93.61 267.79 61 208.45c-36.84-67-30.56-102.12-23.54-117.13C45.82 73.38 58.16 62.65 74.11 52a176.3 176.3 0 0128.64-15.2c1-.43 1.93-.84 2.76-1.21 4.95-2.23 12.45-5.6 21.95-2 6.34 2.38 12 7.25 20.86 16 18.17 17.92 43 57.83 52.16 77.43 6.15 13.21 10.22 21.93 10.23 31.71 0 11.45-5.76 20.28-12.75 29.81-1.31 1.79-2.61 3.5-3.87 5.16-7.61 10-9.28 12.89-8.18 18.05 2.23 10.37 18.86 41.24 46.19 68.51s57.31 42.85 67.72 45.07c5.38 1.15 8.33-.59 18.65-8.47 1.48-1.13 3-2.3 4.59-3.47 10.66-7.93 19.08-13.54 30.26-13.54h.06c9.73 0 18.06 4.22 31.86 11.18 18 9.08 59.11 33.59 77.14 51.78 8.77 8.84 13.66 14.48 16.05 20.81 3.6 9.53.21 17-2 22-.37.83-.78 1.74-1.21 2.75a176.49 176.49 0 01-15.29 28.58c-10.63 15.9-21.4 28.21-39.38 36.58A67.42 67.42 0 01391 480z" />
          </svg>
        </Tooltip>

        <div className="inline-block h-[50%] my-[auto] w-[1px] self-stretch bg-violet-400 dark:bg-white/10"></div>
        <Tooltip content="Video-Call">
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1.1rem"
            width="1.1rem"
            className="mx-2 text-violet-400 dark:text-zinc-400  hover:cursor-pointer hover:text-violet-600 dark:hover:cursor-pointer dark:hover:text-zinc-100"

            //   {...props}
          >
            <path
              fillRule="evenodd"
              d="M0 5a2 2 0 012-2h7.5a2 2 0 011.983 1.738l3.11-1.382A1 1 0 0116 4.269v7.462a1 1 0 01-1.406.913l-3.111-1.382A2 2 0 019.5 13H2a2 2 0 01-2-2V5z"
            />
          </svg>
        </Tooltip>

        <div className="inline-block h-[50%] my-[auto] w-[1px] self-stretch bg-violet-400 dark:bg-white/10"></div>
        <Tooltip content="Info">
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1.1rem"
            width="1.1rem"
            className="mx-2 text-violet-400 dark:text-zinc-400 hover:text-violet-600 hover:cursor-pointer dark:hover:cursor-pointer dark:hover:text-zinc-100"
            onClick={() => setIsAbout((v) => !v)}
            // {...props}
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
          </svg>
        </Tooltip>
      </div>
    </div>
  );
}

export default ChatNav;
