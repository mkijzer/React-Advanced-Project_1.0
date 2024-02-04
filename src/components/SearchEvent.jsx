import { Center, TextInput } from "@chakra-ui/react";

export const SearchEvent = ({ onSearch }) => {
  const handleChange = (event) => {
    const inputValue = event.target.value;
    onSearch(inputValue);
  };
  return (
    <Center>
      <TextInput changeFn={handleChange} />
    </Center>
  );
};
