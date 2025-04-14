import { useAuthStore } from "@/hooks/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export interface SignInResponseType {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

export const useSignIn = () => {
  const { setUsers } = useAuthStore();
  const nav = useNavigate();
  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // TODO: Implement the login logic api
  const SignIn = async (username: string, password: string) => {
    // Simulate an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && password === "password") {
          resolve({
            id: "testid",
            name: "admin",
            email: "email@gmail.com",
            role: "admin",
            token: "fake-token",
          });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const onSubmit = async (data: z.infer<typeof ValidationSchema>) => {
    try {
      const res = (await SignIn(
        data.username,
        data.password
      )) as SignInResponseType;
      // Handle successful login
      if (res) {
        setUsers({
          id: res.id,
          name: res.name,
          email: res.email,
          role: res.role,
          token: res.token,
        });
        nav("/dashboard");
      }
    } catch (error) {
      form.setError("root", {
        message: "Invalid username or password",
        type: "manual",
      });
      console.error("Login failed:", error);
    }
  };

  return { SignIn, onSubmit, form };
};

export const ValidationSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
