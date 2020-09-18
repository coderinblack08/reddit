import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/core';
import Link from 'next/link';
import * as React from 'react';

const Index: React.FC = () => (
  <Box height="100" padding={100}>
    <Flex justify="center" align="center">
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
  </Box>
);

export default Index;
