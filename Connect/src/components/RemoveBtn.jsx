import { Button, Flex, AlertDialog } from "@radix-ui/themes";
function RemoveBtn() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Remove friend</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Remove friend</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to remove Gwen from your friends?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Remove
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default RemoveBtn;
