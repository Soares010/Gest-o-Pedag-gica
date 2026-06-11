import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api.js";

export const useAuthLogic = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const authenticateUser = useCallback(async (userData) => {
    try {
      const response = await api.post("/auth", userData, {
        withCredentials: true,
      });
      const { user, token, message } = response.data;
      setUser(user);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user,
          token,
        }),
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao autenticar:", error);
    }
  }, []);

  return useMemo(() => {
    return {
      authenticateUser,
      user,
    };
  }, [user, authenticateUser]);
};
