import React from "react";
import { Button } from "@chakra-ui/react";

export const EditButton = ({ onEdit, colorScheme }) => {
  return (
    <Button
      colorScheme={colorScheme}
      size="xs"
      onClick={onEdit}
      variant="solid"
    >
      Edit
    </Button>
  );
};
