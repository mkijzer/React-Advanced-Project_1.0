import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Card,
  Stack,
  Heading,
  CardBody,
  CardFooter,
  Center,
  Flex,
} from "@chakra-ui/react";
import { DeleteButton } from "./DeleteButton";
import { AlertWindow } from "./ConfirmWindow";
import { EditButton } from "./EditButton";
import { formatDateTime } from "../utilities/formateDateandTime";
import { UserAvatar } from "./Avatar";
import eventsData from "../events.json";

export const EventDetail = ({
  event,
  onDelete,
  onEdit,
  isAlertOpen,
  onClose,
  onConfirm,
}) => {
  const [creator, setCreator] = useState(null);
  const [categoryNames, setCategoryNames] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${event.createdBy}`
        );
        const userData = await response.json();
        setCreator(userData);
      } catch (error) {
        console.error("We couldn't get the user data:", error);
      }
    };

    if (event.createdBy) {
      fetchUserData();
    }

    const names = event.categoryIds
      .map(
        (id) =>
          eventsData.categories.find((category) => category.id === id)?.name
      )
      .filter((name) => name);

    setCategoryNames(names);
  }, [event.createdBy, event.categoryIds]);

  const formattedStartDateTime = formatDateTime(event.startTime);
  const formattedEndDateTime = formatDateTime(event.endTime);

  const createdByInfo = `Created by: ${creator?.name}`;

  return (
    <Center h="70vh">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        minWidth={{ base: "290px", sm: "75%", md: "80%", lg: "50%", xl: "50%" }}
        maxWidth={{ base: "280px" }}
        maxHeight={{ base: "100%", md: "400px" }}
        position="relative"
        border="none"
        boxShadow="dark-lg"
        p="6"
        rounded="md"
        bg="white"
      >
        <Box
          mt={{ base: "10px", sm: "20px", md: "15px", lg: "20px" }}
          w={{ base: "100%", sm: "40%", md: "200px", lg: "30%" }}
          minHeight={{ base: "100px", sm: "10vh", md: "20vh", lg: "20vh" }}
          bgImage={`url(${event.image})`}
          bgSize="cover"
          bgPosition="center"
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          borderRadius="md"
          overflow="hidden"
          backgroundColor="rgba(15, 98, 146, 0.6)"
          border="none"
          style={{ mixBlendMode: "multiply" }}
        />

        <Stack style={{ position: "relative", zIndex: 1 }}>
          <CardBody fontFamily="monospace" ml={{ sm: "20px", md: "10px" }}>
            <Heading
              fontSize={{ base: "xl", sm: "md", md: "xl", lg: "3xl" }}
              mb={3}
              size="2xl"
              color="#16FF00"
            >
              {event.title}
            </Heading>

            <Text
              fontSize={{ base: "xs", sm: "sm", md: "sm", lg: "lg" }}
              mb={2}
            >
              {event.description}
            </Text>

            <Text fontSize={{ base: "xs", sm: "xs", md: "sm", lg: "sm" }}>
              Start: {formattedStartDateTime}
            </Text>

            <Text fontSize={{ base: "xs", sm: "xs", md: "sm", lg: "sm" }}>
              End: {formattedEndDateTime}
            </Text>

            <Text
              fontSize={{ base: "xs", sm: "xs", md: "sm", lg: "sm" }}
              mt={3}
              mb={2}
              pb={2}
            >
              {event.location}
            </Text>

            {categoryNames.length > 0 && (
              <Text
                fontSize={{ base: "xs", sm: "sm", md: "sm", lg: "sm" }}
                mt={1}
                mb={1}
              >
                Categories: {categoryNames.join(" ")}
              </Text>
            )}

            {creator && (
              <Flex align="center" mt={3}>
                <UserAvatar userId={event.createdBy} />
                <Text
                  fontSize={{ base: "xs", sm: "xs", md: "sm", lg: "sm" }}
                  ml={2}
                  mt={2}
                >
                  {createdByInfo}
                </Text>
              </Flex>
            )}
          </CardBody>

          <CardFooter
            ml={{ sm: "20px", md: "200px", lg: "250px" }}
            position="relative"
            bottom={{ base: "10px", md: "20px", lg: "30px" }}
          >
            <EditButton onEdit={onEdit} colorScheme="yellow" />
            <DeleteButton onDelete={onDelete} colorScheme="purple" />
          </CardFooter>

          <AlertWindow
            isOpen={isAlertOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Delete Event"
            message="Are you sure? This can't be undone!"
          />
        </Stack>
      </Card>
    </Center>
  );
};
