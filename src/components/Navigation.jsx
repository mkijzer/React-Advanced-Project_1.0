import React, { useState, useRef, handleSearchFocus } from "react";
import { Link } from "react-router-dom";

import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Box,
  Text,
  Spacer,
  InputGroup,
  InputLeftElement,
  Input,
  ScaleFade,
  Menu,
  MenuGroup,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  // Radio,
  // RadioGroup,
  // Stack,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";

export const Navigation = ({ onSearch, handleOpenAddEventDrawer }) => {
  const [searchInput, setSearchInput] = useState(" ");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    onSearch(event.target.value);
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <Box>
      <Flex
        as="nav"
        p="40px"
        ml="10px"
        mr="10px"
        alignItems="center"
        gap="10px"
      >
        <Heading
          bgGradient="linear(to-r, #FFED00, #F637EC)"
          bgClip="text"
          color="transparent"
          fontFamily="monospace"
          fontSize={{ base: "2xl", md: "5xl", lg: "8xl" }}
        >
          <Link to="/">MYEVENTs</Link>
        </Heading>

        <Spacer />

        <HStack spacing="40px">
          <Text
            color="#F8E559"
            _hover={{
              transform: "translateY(-2px)",
              "& > div > img": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Link to="/">Events</Link>
          </Text>
          <Text
            display={{ base: "none", md: "block" }}
            color="#F8E559"
            _hover={{
              transform: "translateY(-2px)",
              "& > div > img": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Link to="/event/1">Event details</Link>
          </Text>

          <IconButton
            display={{ base: "none", md: "block" }}
            colorScheme="yellow"
            aria-label="Search"
            icon={<SearchIcon />}
            onClick={toggleSearchVisibility}
            size="sm"
            Color="yellow"
          />

          <Menu>
            <MenuButton
              display={{ base: "block", md: "none", lg: "none" }}
              FontSize="sm"
              size="xs"
              as={Button}
              colorScheme="yellow"
            >
              menu
            </MenuButton>
            <MenuList
              fontSize="xs"
              bgColor="black"
              zIndex="overlay"
              border="none"
            >
              <MenuGroup title="" borderColor="yellow">
                <InputGroup size="md">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="yellow" />
                  </InputLeftElement>
                  <Input
                    placeholder="Search"
                    placeholderColor="yellow"
                    color="yellow"
                    ref={searchInputRef}
                    value={searchInput}
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                  />
                </InputGroup>
              </MenuGroup>

              <MenuItem
                onClick={handleOpenAddEventDrawer}
                color="yellow"
                bgColor="black"
                icon={<AddIcon />}
                command="⌘N"
              >
                New Event
              </MenuItem>
              <MenuItem color="yellow" bgColor="black"></MenuItem>
            </MenuList>
          </Menu>

          {isSearchVisible && (
            <ScaleFade initialScale={1.7} in={isSearchVisible}>
              <InputGroup ml="10px">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search for an event"
                  value={searchInput}
                  onChange={handleSearchChange}
                  color="yellow"
                />
              </InputGroup>
            </ScaleFade>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};
