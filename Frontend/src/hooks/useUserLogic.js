import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api.js";
import { Notifications } from "../utils/Notifications.jsx";
import { errors } from "../utils/errors.js";
import { redirect } from "../utils/redirect.js";

export const useUserLogic = () => {
  const [user, setUser] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Notifications({
      type: "success",
      message: success,
      configMessage: setSuccess,
    });
    Notifications({
      type: "error",
      message: error,
      configMessage: setError,
    });
  }, [success, error]);

  const studentAdd = useCallback(async (user) => {
    try {
      const response = await api.post("/students/add", user, {
        withCredentials: true,
      });
      const { status, message } = JSON.parse(response.data);
      console.log(JSON.parse(response.data));
      if (status === "success") {
        setSuccess(message);
      }

      console.log(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData =
          typeof error.response.data === "string"
            ? JSON.parse(error.response.data)
            : error.response.data;

        // Define o e-mail duplicado no estado de erro para disparar o Toaster
        setError(errorData.message || "Erro ao registrar aluno.");
      } else {
        // Fallback para a sua função global de tratamento de erros
        errors(setError, error);
      }
    }
  }, []);

  return useMemo(() => {
    return {
      user,
      studentAdd,
    };
  }, [user, studentAdd]);
};
