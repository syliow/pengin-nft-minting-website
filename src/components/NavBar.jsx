//create a navbar component

import React from "react";
import {
  Flex,
  Box,
  Button,
  Text,
  HStack,
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

const NavBar = (props) => {
  const { accounts, setAccounts } = props;
  const isConnected = Boolean(accounts[0]);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const connectAccount = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        //provide all the accounts exists in the user's metamask wallet
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  };

  const disconnectAccount = async () => {
    setAccounts([]);
  };

  return (
    <Flex
      justifyContent="space-between"
      align="center"
      padding="30px"
    >
      {isConnected ? (
        <Flex>
          <Text>Account: {accounts}</Text>
          <Box margin="0 15px">Connected</Box>
          <Button onClick={disconnectAccount}>Disconnect</Button>
        </Flex>
      ) : (
        <HStack>
          <h1>Not Connected</h1>
          <Button borderRadius={5} onClick={connectAccount}>
            Connect
          </Button>
        </HStack>
      )}
    </Flex>
  );
};

export default NavBar;
