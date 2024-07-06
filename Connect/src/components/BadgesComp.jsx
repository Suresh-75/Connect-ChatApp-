import { Badge, Flex } from "@radix-ui/themes";

function BadgesComp() {
  return (
    <Flex gap="2">
      <Badge size="3" color="orange">
        Gamer
      </Badge>
      <Badge size="3" color="blue">
        Activist
      </Badge>
      <Badge size="3" color="green">
        Cringe
      </Badge>
    </Flex>
  );
}

export default BadgesComp;
