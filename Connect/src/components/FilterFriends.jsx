import {
  Button,
  Dialog,
  Flex,
  TextField,
  Text,
  Switch,
} from "@radix-ui/themes";
import { useState } from "react";

function FilterFriends() {
  const [newFriends, setNewFriends] = useState(false);
  const handleChnage = () => {
    setNewFriends((v) => !v);
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
            // {...props}
          >
            <path d="M4 11h6a1 1 0 001-1V4a1 1 0 00-1-1H4a1 1 0 00-1 1v6a1 1 0 001 1zm1-6h4v4H5V5zm15-2h-6a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zm-1 6h-4V5h4v4zm-9 12a1 1 0 001-1v-6a1 1 0 00-1-1H4a1 1 0 00-1 1v6a1 1 0 001 1h6zm-5-6h4v4H5v-4zm13-1h-2v2h-2v2h2v2h2v-2h2v-2h-2z" />
          </svg>
        </button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <p className=" text-2xl font-bold">Filter</p>
        <div className="flex justify-between items-center pr-2">
          <span className=" font-[500] mb-1 ">
            {newFriends ? "Search new friends" : "Filter existing friends"}
          </span>
          <Switch defaultChecked={newFriends} onClick={handleChnage} />
        </div>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Tags
            </Text>
            <TextField.Root placeholder="Enter your email" />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Location
            </Text>
            <TextField.Root placeholder="Enter your email" />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <button className=" bg-violet-500 px-3 py-1 rounded-md text-white">
              Save
            </button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default FilterFriends;
