import React from "react";
import { Button } from "@chakra-ui/react";

export const DeleteButton = ({ onDelete }) => {
  return (
    <Button colorScheme="purple" size="xs" onClick={onDelete} variant="ghost">
      Delete
    </Button>
  );
};
