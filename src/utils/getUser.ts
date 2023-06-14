
const getUser = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  }
  return user;
};

export default getUser;
