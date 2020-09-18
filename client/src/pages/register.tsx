import * as React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Text, Heading, Stack, Link } from '@chakra-ui/core';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utilities/toErrorMap';

const Register: React.FC = () => {
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
            console.log(toErrorMap(response.data?.register.errors));
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <Stack height="80vh" justify="center">
              <Heading as="h4" fontWeight="extrabold">
                Register Account
              </Heading>
              <Text>
                Or{' '}
                <Link href="/login">
                  <Text color="blue.400" as="span">
                    log in
                  </Text>
                </Link>{' '}
                with an existing account
              </Text>
              <Box mt={4}>
                <InputField name="name" placeholder="Name" label="Full Name" />
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
  );
};

export default Register;
