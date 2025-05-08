import { z } from "zod";
import { SigninResponse } from "../types/signin.types";
import unauth from "@/api/unauth";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signupUser = async (credentials: {
  username: string;
  password: string;
  email: string;
  name: string;
}) => {
  const { data } = await unauth.post<SigninResponse>(
    "/auth/register",
    credentials
  );
  return data.data;
};

export const useSignUp = () => {
  const { setUsers } = useAuthStore();
  const nav = useNavigate();
  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      name: "",
    },
  });
  const handleSignUp = useMutation({
    mutationFn: (data: z.infer<typeof ValidationSchema>) =>
      signupUser({ username: data.username, password: data.password, email: data.email, name: data.name }),
    onSuccess: (res) => {
      setUsers({
        user: res?.user,
        token: res?.token,
      });
      nav("/dashboard");
    },
    onError: (error) => {
      form.setError("root", {
        message: "Invalid username or password",
        type: "manual",
      });
      console.error("Login failed:", error);
    },
  });

  return { handleSignUp, form };
};

export const ValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
