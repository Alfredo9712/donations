import React from "react";
import { useAuthContext } from "../src/hooks/useAuthContext";
import axios from "axios";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import * as Yup from "yup";

import { useMutation } from "react-query";

export default function Home() {
  const { user, refetch } = useAuthContext();
  const mutation = useMutation(
    (body: { name: string; email: string; password: string }) => {
      return axios.post(`http://localhost:3000/api/public/user/login`, body);
    },
    {
      onSuccess: () => {
        refetch();
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
  const toast = useToast();

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    mutation.mutate(values);
  };

  return (
    <div>
      <h1>Donations</h1>
      <h1>{user?.name}</h1>
      <h1>Test Context login here</h1>
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
    </div>
  );
}
