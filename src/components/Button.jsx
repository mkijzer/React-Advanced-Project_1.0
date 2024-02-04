import { Button as ChakraButton } from "@chakra-ui/react";

export const Button = ({
  buttontext,
  size,
  shadow,
  transition = "0.3s ease",
  onClick,
  colorScheme,
}) => {
  return (
    <ChakraButton
      display={{ base: "none", md: "block", lg: "block" }}
      onClick={onClick}
      size={size}
      shadow={shadow}
      transition={transition}
      colorScheme={colorScheme}
      mr="50px"
    >
      {buttontext}
    </ChakraButton>
  );
};
