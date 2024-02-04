import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import eventsData from "../events.json";

export const EditEventDrawer = ({ event, onClose, onUpdate }) => {
  const [title, setTitle] = useState(event.title || "");
  const [description, setDescription] = useState(event.description || "");
  const [location, setLocation] = useState(event.location || "");
  const [startTime, setStartTime] = useState(event.startTime || "");
  const [endTime, setEndTime] = useState(event.endTime || "");
  const [image, setImage] = useState(event.image || "");
  const [selectedCategory, setSelectedCategory] = useState(
    event.categoryIds && event.categoryIds.length > 0
      ? event.categoryIds[0].toString()
      : ""
  );

  const creatingUser = eventsData.users.find(
    (user) => user.id === event.createdBy
  );

  const [selectedUser, setSelectedUser] = useState(
    event.createdBy ? event.createdBy.toString() : ""
  );
  const [newUserName, setNewUserName] = useState("");
  const [newUserImage, setNewUserImage] = useState(
    "https://picsum.photos/id/783/300/300"
  );

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      id: event.id,
      title,
      description,
      location,
      startTime,
      endTime,
      image,
      categoryIds: selectedCategory
        ? [Number(selectedCategory)]
        : event.categoryIds,
      createdBy: event.createdBy,
    };

    onUpdate(updatedEvent);
    onClose();
  };
  const categories = [
    { name: "sports", id: 1 },
    { name: "games", id: 2 },
    { name: "relaxation", id: 3 },
  ];

  return (
    <Drawer
      isOpen={true}
      placement="right"
      onClose={onClose}
      onUpdate={onUpdate}
    >
      <DrawerOverlay>
        <DrawerContent
          bgGradient="linear(to-b, #1A1A1A, #F637EC)"
          fontFamily="monospace"
          color="#16FF00"
        >
          <DrawerHeader color="#16FF00">Make a change</DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleUpdate}>
              <FormControl id="event.user">
                <FormLabel>User</FormLabel>
                <Input
                  type="text"
                  value={creatingUser ? creatingUser.name : "Unknown User"}
                  isReadOnly
                />
              </FormControl>

              {selectedUser === "new" && (
                <>
                  <FormControl id="newUser.name">
                    <FormLabel>New User Name</FormLabel>
                    <Input
                      type="text"
                      value={newUserName}
                      onChange={(event) => setNewUserName(event.target.value)}
                      placeholder="New User Name"
                    />
                  </FormControl>
                  <FormControl id="newUser.image">
                    <FormLabel>New User Image URL</FormLabel>
                    <Input
                      type="text"
                      value={newUserImage}
                      onChange={(event) => setNewUserImage(event.target.value)}
                      placeholder="https://picsum.photos/id/783/300/300"
                    />
                  </FormControl>
                </>
              )}

              <FormControl id="event.title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Title"
                />
              </FormControl>

              <FormControl id="event.description" isRequired>
                <FormLabel mt={4}>Description</FormLabel>
                <Input
                  type="text"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Description"
                />
              </FormControl>

              <FormControl id="event.location" isRequired>
                <FormLabel mt={4}>Location</FormLabel>
                <Input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Location"
                />
              </FormControl>

              <FormControl id="event.startTime" isRequired>
                <FormLabel mt={4}>Start Time</FormLabel>
                <Input
                  type="datetime-local"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  placeholder="date + time"
                />
              </FormControl>

              <FormControl id="event.endTime" isRequired>
                <FormLabel mt={4}>End Time</FormLabel>
                <Input
                  type="datetime-local"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                  placeholder="date + time"
                />
              </FormControl>

              <FormControl id="event.image">
                <FormLabel mt={4}>Image</FormLabel>
                <Input
                  type="text"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  placeholder="URL of your image"
                />
              </FormControl>

              <FormControl id="event.category">
                <FormLabel mt={4}>Category</FormLabel>
                <RadioGroup
                  value={selectedCategory}
                  onChange={(value) => setSelectedCategory(value)}
                >
                  <Stack direction="row">
                    {categories.map((category) => (
                      <Radio key={category.id} value={category.id.toString()}>
                        {category.name}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>

              <Button type="submit" mt={10} colorScheme="yellow">
                Update Event
              </Button>
            </form>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
