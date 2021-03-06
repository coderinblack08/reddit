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
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utilities/toErrorMap';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utilities/createUrqlClient';

const Register: React.FC = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Box>
      <Navbar />
      <Wrapper variant="small">
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register(values);
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else {
              router.push('/login');
            }
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <Stack height="70vh" justify="center">
                <Heading as="h4" fontWeight="extrabold">
                  Register Account
                </Heading>
                <Text color="gray.500">
                  Or{' '}
                  <Link href="/login">
                    <ALink color="blue.400" as="span">
                      log in
                    </ALink>
                  </Link>{' '}
                  with an existing account
                </Text>
                <Box mt={4}>
                  <InputField
                    name="name"
                    placeholder="Name"
                    label="Full Name"
                  />
                </Box>
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
                  <Checkbox>Agree to terms of service</Checkbox>
                </Box>
                <Box mt={4}>
                  <Button
                    variantColor="yellow"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Register
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

export default withUrqlClient(createUrqlClient)(Register);
