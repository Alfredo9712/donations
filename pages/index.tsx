import React, { FormEvent, useState } from "react";
import { useAuthContext } from "../src/hooks/useAuthContext";
import {
  Input,
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Field, Form, Formik, FieldInputProps, FormikProps } from "formik";
import * as Yup from "yup";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { dispatch } = useAuthContext();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log(event);
    console.log("hi");
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    passsword: Yup.string().required(),
  });

  return (
    <div className={styles.container}>
      <h1>Donations</h1>
      <h1>Test Context login here</h1>
      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit, errors, touched, values, isValid }) => {
          console.log(values);
          return (
            <form>
              <FormControl>
                <FormLabel htmlFor="Name">Name</FormLabel>
                <Field as={Input} name="name" />
                <FormLabel htmlFor="Email">Email</FormLabel>
                <Field as={Input} name="email" />
              </FormControl>
              <Button isDisabled={isValid}>Submit</Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
