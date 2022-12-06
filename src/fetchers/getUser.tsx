const apiUrl = "http://localhost:3000/api";

export const getUser = async () => {
  const response = await fetch("http://localhost:3000/api/private/user/");

  const user = await response.json();

  return user;
};
