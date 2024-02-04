import React from "react";
import { Avatar, Box } from "@chakra-ui/react";
import eventsData from "../events.json";

export const UserAvatar = ({ userId }) => {
  const user = eventsData.users.find((user) => user.id === userId);

  const avatarSrc = user?.image || "https://picsum.photos/id/783/300/300";

  return (
    <Box align="right">
      <Avatar src={avatarSrc} name={user?.name || "Default User"} />
    </Box>
  );
};
