import {
  Box,
  Flex,
  Text,
  Link as ALink,
  Spinner,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from '@chakra-ui/core';
import * as React from 'react';
import { DarkModeSwitch } from './DarkModeSwitch';
import Link from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

const Navbar: React.FC = () => {
  const { colorMode } = useColorMode();
  const [{ fetching: logoutPending }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  return (
    <Box py={4} px={[5, 5, 10, 20]}>
      <Flex justify="space-between" w="100%">
        <Link href="/">
          <ALink fontWeight="bold" fontSize="lg">
            <Flex alignItems="center">
              <Box
                as="svg"
                marginRight={2}
                className="icon icon-tabler icon-tabler-brand-reddit"
                width="25px"
                height="25px"
                stroke-width="1.5"
                stroke={colorMode === 'dark' ? 'gray.400' : 'gray.800'}
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M12 8c2.648 0 5.028 .826 6.675 2.14a2.5 2.5 0 0 1 2.326 4.36 C21 18.09 16.971 21 12 21c-4.875 0-8.845-2.8-8.996-6.294L3 14.5h0a2.5 2.5 0 0 1 2.326 -4.36C6.972 8.827 9.352 8 12 8z" />
                <path d="M12 8l1-5 6 1" />
                <circle cx="19" cy="4" r="1" />
                <circle cx="9" cy="13" r=".5" fill="currentColor" />
                <circle cx="15" cy="13" r=".5" fill="currentColor" />
                <path d="M10 17c.667 .333 1.333 .5 2 .5s1.333 -.167 2 -.5" />
              </Box>
              Coderinblack Reddit
            </Flex>
          </ALink>
        </Link>
        <Flex justify="space-between" align="center">
          {!data?.me ? (
            <>
              <Box mr={6}>
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </Box>
              <Box mr={6}>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </Box>
            </>
          ) : (
            <Box mr={6}>
              {fetching ? (
                <Spinner />
              ) : (
                <Menu>
                  <MenuButton as={Button} rightIcon="chevron-down">
                    My Account
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      {data.me.email} ({data.me.name})
                    </MenuItem>
                    <MenuItem>Change Password</MenuItem>
                    <MenuItem
                      onClick={() => logout()}
                      as="button"
                      isDisabled={logoutPending}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Box>
          )}
          <DarkModeSwitch />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
