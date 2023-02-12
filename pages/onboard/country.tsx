import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { Button, FormControl, useToast, Box, Select } from "@chakra-ui/react";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import useGetUser from "../../src/hooks/useGetUser";
const validationSchema = Yup.object({
  country: Yup.string().required(),
});

const country = () => {
  const client = useQueryClient();
  const router = useRouter();
  const { user } = useGetUser() || {};
  const toast = useToast();
  const mutation = useMutation(
    (body: { country: string }) => {
      return axios.post(
        `http://localhost:3000/api/private/user/stripe/account`,
        body
      );
    },
    {
      onSuccess: () => {
        client.invalidateQueries("user");
        router.push("/onboard/stripe");
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

  const handleSubmit = (values: { country: string }) => {
    mutation.mutate(values);
  };

  return (
    <Box>
      <Formik
        initialValues={{ country: "" }}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ handleSubmit, isValid, values, setFieldValue }) => {
          console.log(isValid);
          return (
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Select
                  placeholder="Select option"
                  onChange={(e) => setFieldValue("country", e.target.value)}
                >
                  <option value="US">United States</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </Select>
              </FormControl>
              <Button isDisabled={!isValid || !user?._id} type="submit">
                Submit
              </Button>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default country;
