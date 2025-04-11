import { z } from "zod";

export const useSignUp = () => {
  // TODO: Implement the login logic api
  const SignUp = async (username: string, password: string) => {
    // Simulate an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && password === "password") {
          resolve({ token: "fake-token" });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  return { SignUp };
};

export const ValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
