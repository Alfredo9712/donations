import React from "react";

import { Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import * as Yup from "yup";

import styles from "../styles/Home.module.css";

export default function Home() {
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const handleSubmit = (values: { name: string; email: string }) => {
    console.log(values);
  };

  return (
    <div className={styles.container}>
      <h1>Donations</h1>
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
                <Field as={Input} name="password" />
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
