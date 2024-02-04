import React from "react";
import { Link } from "react-router-dom";
import { Box, Text, Image, Card, Avatar, Spacer } from "@chakra-ui/react";

export const EventCard = ({ event, userName, userImage }) => {
  const formatStartDate = (startDate) => {
    try {
      const date = new Date(startDate);
      if (isNaN(date)) {
        throw new Error("Please fill in a valid date");
      }
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    } catch (error) {
      console.error("There was an error formatting the date:", error);
      return "Please fill in a valid date";
    }
  };

  return (
    <Link to={`/event/${event.id}`}>
      <Card
        maxW={{ base: "200px", md: "330px", lg: "300px" }}
        minW={{ base: "270px", md: "330px", lg: "350px" }}
        border=""
        borderRadius="md"
        p="4"
        m="2"
        cursor="pointer"
        minH={{ base: "150px", md: "150px", lg: "200px" }}
        overflow="hidden"
        position="relative"
        boxShadow="xl"
        rounded="md"
        bg="black"
        _hover={{
          transform: "translateY(-2px)",
          "& > div > img": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          borderRadius="md"
          overflow="hidden"
        >
          {" "}
          <Image
            src={event.image}
            alt={event.title}
            objectFit="cover"
            boxSize="100%"
            transition="transform 0.3s ease-in-out"
          />{" "}
          <Box position="absolute" right="20px" bottom="20px" zIndex="1">
            <Avatar
              src={userImage}
              name={userName}
              size={{ base: "md", md: "md", lg: "lg" }}
            />
          </Box>
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            backgroundColor="rgba(15, 98, 146, 0.6)"
            zIndex="1"
          ></Box>
        </Box>

        <Box zIndex="1" position="relative">
          <Text
            fontSize="2xl"
            maxW="100%"
            color="#16FF00"
            fontFamily="monospace"
            marginTop="35px"
          >
            {event.title}
          </Text>

          <Text
            fontSize="xs"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            mb="2"
            maxWidth="100%"
            color="#FFED00"
            fontFamily="monospace"
            marginLeft="2px"
          >
            {event.location}
          </Text>
        </Box>

        <Text
          fontSize="sm"
          color="#FFED00"
          position="absolute"
          top="2"
          right="2"
          fontFamily="monospace"
          zIndex="1"
        >
          {formatStartDate(event.startTime)}
        </Text>
      </Card>
    </Link>
  );
};
