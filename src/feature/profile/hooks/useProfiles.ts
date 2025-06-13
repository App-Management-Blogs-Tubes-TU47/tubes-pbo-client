import auth from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { callAlert, confirmAPIForm } from "@/components/custom-alert";
import { useEffect, useState } from "react";
import { UserDetailsResponse } from "@/feature/users/types/user-detail.types";
import { useAuthStore } from "@/hooks/useAuthStore";

const updateUsersApi = async (body: {
  uname: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  profile?: File | string | null;
}) => {
  const formData = new FormData();
  formData.append("name", body.name);
  formData.append("username", body.username);
  formData.append("email", body.email);
  formData.append("role", body.role);
  if (body.password) {
    formData.append("password", body.password);
  }

  if (body.profile && typeof body.profile !== "string") {
    formData.append("profile", body.profile);
  }

  const { data } = await auth.patch<UserDetailsResponse>(
    `/users/${body.uname}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.data;
};

export const getDetailsUsersApi = async (username: string) => {
  const { data } = await auth.get<UserDetailsResponse>(`/users/${username}`);
  return data.data;
};

export const useProfiles = () => {
  const { users, setUsers } = useAuthStore();
  const [isEdited, setIsEdited] = useState(false);
  const uname = users.user?.username;
  const submitUser = useMutation({
    mutationFn: (data: {
      name: string;
      username: string;
      email: string;
      password?: string;
      role: string;
      profile?: File | string | null;
    }) => updateUsersApi({ ...data, uname }),
    onSuccess: (data) => {
      setIsEdited(false);
      setUsers({
        ...users,
        user: {
          ...users.user,
          name: data.name,
          username: data.username,
          email: data.email,
          profileUrl:
            typeof data.profileUrl === "string" ? data.profileUrl : null,
        },
      });
      callAlert({
        type: "success",
        title: "Success!",
        message: "Profile update successfully",
        onConfirm(result) {
          if (result.isConfirmed) {
            //
          }
        },
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmitUser = (data: {
    name: string;
    username: string;
    email: string;
    password?: string;
    role: string;
    profile?: File | string | null;
  }) => {
    const newdata = {
      ...data,
    };
    confirmAPIForm({
      type: "question",
      title: "Confirmation",
      callAPI: () => submitUser.mutate(newdata),
      onAlertSuccess: () => {},
    });
  };

  const form = useForm<z.infer<ReturnType<typeof getValidationSchema>>>({
    resolver: zodResolver(getValidationSchema(!!uname)),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      role: "",
      profile: null,
    },
  });

  /**
   * @description
   * This function is used to set the default values of the form when the component is mounted.
   * It will fetch the user details from the API and set the values in the form.
   * It will only run when the component is mounted or when the `uname` changes.
   */
  const { setValue } = form;

  const { data, refetch: fetchUserDetails } = useQuery({
    queryKey: ["user-details", uname],
    queryFn: () => getDetailsUsersApi(uname as string),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (uname) {
      fetchUserDetails().then((data) => {
        if (data) {
          const value = data?.data;
          setValue("name", value?.name ?? "");
          setValue("username", value?.username ?? "");
          setValue("email", value?.email ?? "");
          setValue("role", value?.role ?? "");

          setValue("profile", value?.profileUrl);
        }
      });
    }
  }, [uname, fetchUserDetails]);

  const handleResetForm = () => {
    setValue("name", data?.name ?? "");
    setValue("username", data?.username ?? "");
    setValue("email", data?.email ?? "");
    setValue("role", data?.role ?? "");
    setValue("profile", data?.profileUrl);
  };

  return {
    data,
    handleSubmitUser,
    form,
    handleResetForm,
    isEdited,
    setIsEdited,
  };
};

const getValidationSchema = (isEdit: boolean) => {
  return z.object({
    name: z.string().min(1, { message: "Name is required" }),
    username: z.string().min(1, { message: "username is required" }),
    email: z.string().min(1, { message: "Email is required" }),
    // password: z.string().optional(),
    password: isEdit
      ? z.string().optional()
      : z.string().min(1, { message: "Password is required" }),
    role: z.string().min(1, { message: "Role is required" }),
    profile: z.any().nullable().optional(),
  });
};

// export const ValidationSchema =
