import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = {
  title: string;
  type?: "primary" | "secondary";
} & IButtonProps;

export function Button({ title, type = "primary", ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded={"sm"}
      textTransform="uppercase"
      bg={type === "secondary" ? "red.500" : "yellow.500"}
      _pressed={{
        bg: type === "secondary" ? "red.600" : "yellow.600",
      }}
      _loading={{
        _spinner: { color: "gray.900" },
      }}
      {...rest}
    >
      <Text
        fontSize={"sm"}
        fontFamily="heading"
        textTransform={"uppercase"}
        color={type === "secondary" ? "white" : "gray-900"}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
