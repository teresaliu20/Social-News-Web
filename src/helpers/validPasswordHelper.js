const validPassword = (password) => {
  if (password.length < 8) {
    return false;
  }
  const pattern = new RegExp('^(?=.*[0-9])');
  return pattern.test(password);
};

export default validPassword;
