import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { EventDetail } from "../components/Eventdetail";
import { useParams, useNavigate } from "react-router-dom";
import { EditEventDrawer } from "../components/EditEventDrawer";

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [isAlertOpen, setisAlertOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const onOpen = () => setisAlertOpen(true);
  const onClose = () => setisAlertOpen(false);

  const saveUpdatedEvent = async (updatedEvent) => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/${updatedEvent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (response.ok) {
        setEvent(updatedEvent);
        onClose();
      } else {
        console.error("The computer failed to update the event");
      }
    } catch (error) {
      console.error("There was an error updating this event:", error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventResponse = await fetch(
          `http://localhost:3000/events/${eventId}`
        );
        const eventDetails = await eventResponse.json();
        setEvent(eventDetails);

        const allEventsResponse = await fetch("http://localhost:3000/events");
        const allEvents = await allEventsResponse.json();
        setEvents(allEvents);
      } catch (error) {
        console.error("There was an error when fetching this event:", error);
      }
    };

    fetchEvents();
  }, [eventId]);

  const navigateToEvent = (newEventId) => {
    navigate(`/event/${newEventId}`);
  };

  const navigateToPreviousEvent = () => {
    const currentIndex = events.findIndex(
      (event) => event.id.toString() === eventId
    );
    if (currentIndex > 0) {
      navigateToEvent(events[currentIndex - 1].id);
    }
  };

  const navigateToNextEvent = () => {
    const currentIndex = events.findIndex(
      (event) => event.id.toString() === eventId
    );
    if (currentIndex >= 0 && currentIndex < events.length - 1) {
      navigateToEvent(events[currentIndex + 1].id);
    }
  };

  const handleActualDeletion = () => {
    handleEventDelete(event.id);
    onClose();
  };

  const handleEventDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("it wasn't possible to delete the event");
      }
    } catch (error) {
      console.error("There was an error deleting the event:", error);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  return (
    <div>
      <Box
        position="absolute"
        top="40%"
        left={{ base: "15px", sm: "20px", md: "40px", lg: "230px" }}
        cursor="pointer"
        fontSize="2xl"
        color="#16FF00"
        onClick={navigateToPreviousEvent}
      >
        {"<"}
      </Box>

      <Box
        position="absolute"
        top="40%"
        right={{ base: "15px", sm: "20px", md: "40px", lg: "230px" }}
        cursor="pointer"
        fontSize="2xl"
        color="#16FF00"
        onClick={navigateToNextEvent}
      >
        {">"}
      </Box>

      {event && (
        <EventDetail
          event={event}
          startTime={event.startTime}
          endTime={event.endTime}
          location={event.location}
          image={event.image}
          onDelete={onOpen}
          isAlertOpen={isAlertOpen}
          onClose={onClose}
          onConfirm={handleActualDeletion}
          onEdit={handleEdit}
        />
      )}

      {isEditMode && (
        <EditEventDrawer
          event={event}
          onClose={() => setIsEditMode(false)}
          onUpdate={saveUpdatedEvent}
        />
      )}
    </div>
  );
};
