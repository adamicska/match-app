export const loadUser = (user) => {
  this.setState({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      thumbnail: "",
    },
  });
};
