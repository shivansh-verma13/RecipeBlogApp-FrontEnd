import { useAuth } from "../context/AuthContext";

export const useGetUserID = () => {
  const auth = useAuth();
  return auth?.userId;
};
