import unauth from "@/api/unauth";
import { useAuthStore } from "@/hooks/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { SigninResponse } from "../types/signin.types";

export interface SignInResponseType {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const { data } = await unauth.post<SigninResponse>(
    "/auth/login",
    credentials
  );
  return data.data;
};

export const useSignIn = () => {
  const { setUsers } = useAuthStore();
  const nav = useNavigate();
  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      username: "administrator",
      password: "1!Password",
    },
  });

  const handleSignIn = useMutation({
    mutationFn: (data: z.infer<typeof ValidationSchema>) =>
      loginUser({ username: data.username, password: data.password }),
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

  return { handleSignIn, form };
};

export const ValidationSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
