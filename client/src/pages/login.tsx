import * as React from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import {
  Box,
  Button,
  Text,
  Heading,
  Stack,
  Checkbox,
  Link as ALink,
} from '@chakra-ui/core';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { toErrorMap } from '../utilities/toErrorMap';
import { useLoginMutation } from '../generated/graphql';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utilities/createUrqlClient';

const Login: React.FC = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Box>
      <Navbar />
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({ options: values });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else {
              router.push('/');
            }
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <Stack height="65vh" justify="center">
                <Heading as="h4" fontWeight="extrabold">
                  Account Login
                </Heading>
                <Text color="gray.500">
                  Or{' '}
                  <Link href="/register">
                    <ALink color="blue.400" as="span">
                      register
                    </ALink>
                  </Link>{' '}
                  a new account
                </Text>
                <Box mt={4}>
                  <InputField
                    name="email"
                    placeholder="Email"
                    label="Email Address"
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="password"
                    placeholder="Password"
                    label="Password"
                    type="password"
                  />
                </Box>
                <Box mt={5}>
                  <Checkbox>Stay logged in</Checkbox>
                </Box>
                <Box mt={4}>
                  <Button
                    variantColor="yellow"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Login
                  </Button>
                </Box>
              </Stack>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
