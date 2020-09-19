import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import * as React from 'react';
import Navbar from '../components/Navbar';
import Wrapper from '../components/Wrapper';
import { createUrqlClient } from '../utilities/createUrqlClient';

const Index: React.FC = () => {
  return (
    <Box>
      <Navbar />
      <Wrapper>
        <Flex justify="center" align="center" height="40vh">
          <Stack spacing={2}>
            <Heading as="h1" size="2xl" fontWeight="black">
              Codeirnblack Reddit
            </Heading>
            <Text fontSize="2xl" color="gray.500">
              Discuss among your communities
            </Text>
            <Flex marginTop={3}>
              <Link href="/register">
                <Button
                  marginRight={2}
                  variantColor="yellow"
                  _hover={{
                    shadow: 'sm',
                  }}
                >
                  <a>Get Started</a>
                </Button>
              </Link>
              <Button
                _hover={{
                  shadow: 'sm',
                }}
              >
                Learn More
              </Button>
            </Flex>
          </Stack>
        </Flex>
        <Box position="fixed" bottom={5} right={5} color="gray.500">
          <a href="https://github.com/coderinblack08">
            🚀 Created by Coderinblack Labs
          </a>
        </Box>
      </Wrapper>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
