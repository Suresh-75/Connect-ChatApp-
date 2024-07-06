import { AlertDialog, Button, Flex } from "@radix-ui/themes";

function SaveDialog({ handleUpdate }) {
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <button
            // type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Update Profile</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to update your profile info? Once done it cant
            be undone. .
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                type="submit"
                variant="solid"
                color="blue"
                onClick={handleUpdate}
              >
                Update
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}

export default SaveDialog;
