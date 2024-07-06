import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
function Settings({ darkModeHandler }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button
          className="text-sm p-2 rounded-lg hover:bg-violet-100 dark:hover:bg-purple-950"
          type="button"
        >
          Settings
        </button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="550px">
        <p className="font-bold text-2xl">Settings</p>
        <Dialog.Description size="2" mb="2">
          <div className="w-full text-base flex justify-between items-center pr-1">
            Light/ Dark mode
            <button
              className="mr-2 hover:text-violet-400 dark:hover:text-violet-700"
              onClick={darkModeHandler}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1.5rem"
                width="1.5rem"
                // {...props}
              >
                <path d="M8 11a3 3 0 110-6 3 3 0 010 6zm0 1a4 4 0 100-8 4 4 0 000 8zM8 0a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 0zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 13zm8-5a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM3 8a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2A.5.5 0 013 8zm10.657-5.657a.5.5 0 010 .707l-1.414 1.415a.5.5 0 11-.707-.708l1.414-1.414a.5.5 0 01.707 0zm-9.193 9.193a.5.5 0 010 .707L3.05 13.657a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm9.193 2.121a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707zM4.464 4.465a.5.5 0 01-.707 0L2.343 3.05a.5.5 0 11.707-.707l1.414 1.414a.5.5 0 010 .708z" />
              </svg>
            </button>
          </div>
        </Dialog.Description>
        <Dialog.Description size="2" mb="1">
          <p className="font-bold text-xl">Make changes to your profile.</p>
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              defaultValue="Freja Johnsen"
              placeholder="Enter your full name"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              defaultValue="freja@example.com"
              placeholder="Enter your email"
            />
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

export default Settings;
