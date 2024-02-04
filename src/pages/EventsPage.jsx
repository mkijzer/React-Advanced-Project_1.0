import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import eventsData from "../events.json";
import {
  UnorderedList,
  ListItem,
  Box,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Center,
} from "@chakra-ui/react";

import { Button } from "../components/Button";
import { EventCard } from "../components/EventCard";
import { AddEventDrawer } from "../components/AddEventDrawer";

export const EventsPage = () => {
  const { searchQuery } = useOutletContext();
  const [isAddEventDrawerOpen, setAdeventDrawerOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const categoryNames = eventsData.categories.map((category) => category.name);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleOpenAddEventDrawer = () => {
    setAdeventDrawerOpen(true);
  };

  const handleCloseAddEventDrawer = () => {
    setAdeventDrawerOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventResponse = await fetch(`http://localhost:3000/events`);
        const eventData = await eventResponse.json();

        const userResponse = await fetch(`http://localhost:3000/users`);
        const userData = await userResponse.json();

        const categoryResponse = await fetch(
          `http://localhost:3000/categories`
        );
        const categoryData = await categoryResponse.json();

        const eventsWithUserDetails = eventData.map((eventItem) => {
          const eventUser = userData.find(
            (user) => user.id === eventItem.createdBy
          );
          return {
            ...eventItem,
            userName: eventUser ? eventUser.name : "Unknown User",
            userImage: eventUser
              ? eventUser.image
              : "https://picsum.photos/200/300",
          };
        });

        setEvents(eventsWithUserDetails);
        setCategories(categoryData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredEvents = events.filter((eventItem) => {
    const isCategoryMatch =
      selectedCategory === "All Categories" ||
      eventItem.categoryIds?.some((id) => {
        const foundCategory = eventsData.categories.find(
          (categoryItem) => categoryItem.id === id
        );
        return foundCategory && foundCategory.name === selectedCategory;
      });

    const isSearchMatch =
      !searchQuery ||
      Object.values(eventItem).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return isCategoryMatch && isSearchMatch;
  });

  return (
    <Box overflow="none">
      <Center>
        <Button
          mr="30px"
          display={{ base: "none", md: "inline-flex" }}
          buttontext="new +"
          onClick={handleOpenAddEventDrawer}
          colorScheme="yellow"
          fontFamily="monospace"
          variant="ghost"
          size="xs"
          shadow="md"
          borderColor="red"
          transition="0.2s ease"
        />
        <RadioGroup
          onChange={handleCategoryChange}
          value={selectedCategory}
          colorScheme="yellow"
          color="yellow"
        >
          <Stack direction="row">
            <Radio
              value="All Categories"
              size={{ base: "sm", md: "md" }}
              fontSize={{ base: "sm", md: "md" }}
              colorScheme="yellow"
              mr={{ base: "5px", md: "40px" }}
              ml={{ base: "10px" }}
            >
              all
            </Radio>
            {categoryNames.map((categoryName) => (
              <Radio
                key={categoryName}
                value={categoryName}
                size={{ base: "sm", md: "md" }}
                fontSize={{ base: "sm", md: "md" }}
                mr={{ base: "5px", md: "40px" }}
                colorScheme="yellow"
                fontColor="yellow"
              >
                {categoryName}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Center>
      <Flex
        justifyContent={{ base: "center", md: "flex-start" }}
        alignItems="center"
        flexDirection="column"
        className="events-container"
      >
        <UnorderedList
          listStyleType="none"
          m={1}
          p={1}
          display="flex"
          flexWrap="wrap"
          gap="10px"
          width="80%"
          mt="50px"
        >
          {filteredEvents.map((event) => (
            <ListItem
              key={event.id}
              className="event-card"
              flexBasis={{ base: "250px", md: "300px", lg: "350px" }}
              mb={{ base: "-85px", md: "0" }}
              position="relative"
              zIndex="1"
              _hover={{
                zIndex: 2,
                transform: { base: "translateY(-61px)", md: "none" },
                boxShadow: { md: "none" },
              }}
              _last={{ transform: { base: "none", md: "none" } }}
              transition="transform 0.2s ease, z-index 0.2s ease"
            >
              <EventCard
                event={event}
                userName={event.userName}
                userImage={event.userImage}
              />
            </ListItem>
          ))}
        </UnorderedList>
        {isAddEventDrawerOpen && (
          <AddEventDrawer
            isOpen={isAddEventDrawerOpen}
            onClose={handleCloseAddEventDrawer}
          />
        )}
      </Flex>
    </Box>
  );
};
