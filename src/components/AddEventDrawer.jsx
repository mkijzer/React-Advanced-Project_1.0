import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { AddEventForm } from "./AddEventForm";

export const AddEventDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent
        bgGradient="linear(to-b, #1A1A1A, #F637EC)"
        fontFamily="monospace"
        color="#16FF00"
      >
        <DrawerHeader color="#16FF00">New Event</DrawerHeader>
        <DrawerBody>
          <AddEventForm handleClose={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
