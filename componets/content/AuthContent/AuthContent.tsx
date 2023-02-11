import React from "react";
import axios from "axios";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Box,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";

const AuthContent = () => {
  const client = useQueryClient();
  const toast = useToast();
  const mutation = useMutation(
    (body: { name: string; email: string; password: string }) => {
      return axios.post(`http://localhost:3000/api/public/user/login`, body);
    },
    {
      onSuccess: () => {
        client.invalidateQueries("user");
        console.log("yes");
      },
      onError: (error: {
        response: {
          data: {
            message: string;
          };
        };
      }) => {
        toast({
          title: "Error",
          description: error.response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      },
    }
  );

  const logoutMutation = useMutation(
    () => {
      return axios.post(`http://localhost:3000/api/public/user/logout`);
    },
    {
      onSuccess: () => {
        client.invalidateQueries("user");
      },
    }
  );

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    mutation.mutate(values);
  };

  return (
    <Box>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ handleSubmit, isValid }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel htmlFor="Name">Name</FormLabel>
                <Field as={Input} name="name" />
                <FormLabel htmlFor="Email">Email</FormLabel>
                <Field as={Input} name="email" />
                <FormLabel htmlFor="Email">Password</FormLabel>
                <Field as={Input} name="password" type="password" />
              </FormControl>
              <Button isDisabled={!isValid} type="submit">
                Submit
              </Button>
            </form>
          );
        }}
      </Formik>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default AuthContent;
