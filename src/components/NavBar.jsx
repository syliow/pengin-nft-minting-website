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

  console.log(colorMode,'color')
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>Pengin Club </Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            {!isConnected ? (
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"pink.400"}
                href={"#"}
                _hover={{
                  bg: "pink.300",
                }}
                borderRadius={5}
                onClick={connectAccount}
              >
                Connect
              </Button>
            ) : (
              <><Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"pink.400"}
                  href={"#"}
                  _hover={{
                    bg: "pink.300",
                  }}
                  borderRadius={5}
                  onClick={disconnectAccount}
                >
                  Disconnect
                </Button><Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar
                        size={"sm"}
                        src={"https://avatars.dicebear.com/api/male/username.svg"} />
                    </MenuButton>
                    <MenuList alignItems={"center"}>
                      <br />
                      <Center>
                        <Avatar
                          size={"2xl"}
                          src={"https://avatars.dicebear.com/api/male/username.svg"} />
                      </Center>
                      <br />
                      <Center>
                        <Text>Account: {accounts}</Text>
                      </Center>
                      <br />
                      {/* <MenuDivider /> */}
                      {/* <MenuItem>Your Servers</MenuItem>
    <MenuItem>Account Settings</MenuItem>
    <MenuItem>Logout</MenuItem> */}
                    </MenuList>
                  </Menu></>
            )}

           
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
