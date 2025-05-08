import unauth from "@/api/unauth";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { LandingAuthorDetailsResponse, LandingAuthorDetailsResponseData } from "../types/author.types";


export const fetchAuthorDetail = async (
    username: string
  ): Promise<LandingAuthorDetailsResponseData> => {
    const { data } = await unauth.get<LandingAuthorDetailsResponse>(`/public/author/${username}`);
    return data.data;
  };
  

export const useAuthorDetails = () => {
    const { username } = useParams();

    const { data, isLoading, isError } = useQuery<LandingAuthorDetailsResponseData>({
        queryKey: ["authorDetails", username],
        queryFn: () => fetchAuthorDetail(username as string),
        enabled: !!username,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
    
    return {
        authorDetails: data,
        isLoading,
        isError,
        username
    };
}