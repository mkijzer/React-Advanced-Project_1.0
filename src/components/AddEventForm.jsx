import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Stack,
  RadioGroup,
  Radio,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import eventsData from "../events.json";

const categories = eventsData.categories;

export const AddEventForm = ({ handleClose }) => {
  const [newUserName, setNewUserName] = useState("");
  const [newUserImage, setNewUserImage] = useState(
    "https://picsum.photos/id/783/300/300"
  );
  const [selectedUser, setSelectedUser] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState("https://picsum.photos/400/500");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    console.log(
      "are all the user loaded. BECAUSE WHERE IS IGNACIO!!! : ",
      eventsData.users
    );

    // *** THE FIRST USER OR ELSE IT CAN"T BE SELECTED ***

    if (eventsData.users.length > 0) {
      const firstUserId = eventsData.users[0].id.toString();
      setSelectedUser(firstUserId);
    }
  }, []);

  // *** USER SELECTION ***

  const handleUserChange = (event) => {
    const value = event.target.value;

    setSelectedUser(value);
    if (value === "new") {
      setImage("https://picsum.photos/400/500");
      setNewUserName("");
      setNewUserImage("https://picsum.photos/id/783/300/300");
    } else {
      const user = eventsData.users.find(
        (user) => user.id.toString() === value
      );
      if (user) {
        setNewUserName(user.name);
      }
    }
  };

  // *** SEND DATA TO SERVER ***

  const sendDataToServer = async () => {
    let userDetail = {};

    if (selectedUser === "new") {
      try {
        const userResponse = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newUserName,
            image: newUserImage,
          }),
        });
        if (!userResponse.ok)
          throw new Error("It didnt work to create a new user");
        const newUser = await userResponse.json();
        userDetail = { id: newUser.id, name: newUserName, image: newUserImage };
      } catch (error) {
        console.error("There was an error creating a user:", error);
        toast({
          title: "Error",
          description: "It didnt work to create a new user",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    } else {
      userDetail = eventsData.users.find(
        (user) => user.id.toString() === selectedUser
      );
      if (!userDetail) {
        console.error("The selected user wasnt't found in existing users");
        return;
      }
    }

    // *** SENDING BACK TO THE SERVER ***
    try {
      const eventResponse = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          location,
          startTime,
          endTime,
          image,
          categoryIds: selectedCategory ? [Number(selectedCategory)] : [],
          createdBy: userDetail.id,
          userName: userDetail.name,
          userImage: userDetail.image,
        }),
      });

      if (!eventResponse.ok)
        throw new Error("It didnt work to create a new event");

      toast({
        title: "Event created",
        description: "You created succesfully a new event",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      handleClose();
      navigate("/");
    } catch (error) {
      console.error("There was an error creating this event", error);
      setError(error.message);
      toast({
        title: "Error",
        description: `It didnt work to create a new event ${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = (event) => {
    sendDataToServer();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/*** SELECT USER ***/}
      <FormControl id="event.user">
        <FormLabel>User</FormLabel>
        <Select value={selectedUser} onChange={handleUserChange}>
          {eventsData.users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
          <option value="new">Create New</option>
        </Select>
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
              placeholder="User Image URL"
            />
          </FormControl>
        </>
      )}

      {/* EVENT INPUT FIELDS */}
      <FormControl id="event.title">
        <FormLabel mt={4}>Title</FormLabel>
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
          placeholder="Start Time"
        />
      </FormControl>
      <FormControl id="event.endTime" isRequired>
        <FormLabel mt={4}>End Time</FormLabel>
        <Input
          type="datetime-local"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
          placeholder="End Time"
        />
      </FormControl>
      <FormControl id="event.image">
        <FormLabel mt={4}>Image URL</FormLabel>
        <Input
          type="text"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          placeholder="https://picsum.photos/400/500"
        />
      </FormControl>
      <FormControl id="event.category">
        <FormLabel mt={4}>Category</FormLabel>
        <RadioGroup onChange={setSelectedCategory} value={selectedCategory}>
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
        Add Event
      </Button>
    </form>
  );
};
