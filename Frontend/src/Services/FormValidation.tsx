const signupValidation = (name: string, value: string) => {
  switch (name) {
    case "name":
      if (value.length === 0) return "Name is required.";
      return "";

    case "email":
      if (value.length === 0) return "Email is required.";

      const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
      if (!emailRegex.test(value)) return "Invalid email format.";

      return "";

    case "password":
      if (value.length === 0) return "Password is required.";
      if (value.length < 8) return "Password must be 8 characters long.";
      return "";

    default:
      return "";
  }
};

const loginValidation = (name: string, value: string) => {
  switch (name) {
    case "email":
      if (value.length === 0) return "Email is required.";
      return "";
    case "password":
      if (value.length === 0) return "Password is required.";
      if (value.length < 8) return "Password must be 8 characters long.";
      return "";

    default:
      return "";
  }
};

export { signupValidation, loginValidation };
