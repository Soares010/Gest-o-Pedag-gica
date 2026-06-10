import { useCallback, useMemo, useState } from "react";
import { api } from "../services/api.js";

export const useAuthLogic = () => {
  const [user, setUser] = useState([]);

  const authenticateUser = useCallback(async (user) => {
    try {
      const response = await api.post("/auth", user);
    } catch (error) {}
  }, []);

  return useMemo(() => {
    return {
      authenticateUser,
      user,
    };
  }, [user, authenticateUser]);
};
