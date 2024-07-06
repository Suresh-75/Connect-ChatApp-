import { Calendar } from "./ui/calendar";
import { Popover } from "@radix-ui/themes";

export function CalendarDemo({ edit, setDob, dob }) {
  // const [date, setDate] = useState(new Date());

  return (
    <Popover.Root>
      <Popover.Trigger disabled={edit}>
        {/* <button
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
            edit ? "dark:text-gray-500" : "dark:text-white"
          } dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        >
          Date of Birth
        </button> */}
        <button
          className={`bg-gray-50 border pl-3 text-left font-normal text-muted-foreground border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
            edit ? "dark:text-gray-500" : "dark:text-white"
          } dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        >
          {dob ? dob.toISOString().substring(0, 10) : "Pick a date"}
          {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
        </button>
      </Popover.Trigger>
      <Popover.Content size="1">
        <Calendar
          mode="single"
          selected={dob}
          onSelect={setDob}
          className="rounded-md  shadow "
        />
      </Popover.Content>
    </Popover.Root>
  );
}
