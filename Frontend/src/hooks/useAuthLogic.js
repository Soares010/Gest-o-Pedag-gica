import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api.js";
import { Notifications } from "../utils/Notifications.jsx";
import { errors } from "../utils/errors.js";
import { redirect } from "../utils/redirect.js";
import { passwordValidate, validate } from "../utils/validator.js";

export const useAuthLogic = () => {
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

  const authenticateUser = useCallback(async (userData) => {
    //     const required = ["email", "password"];

    //     const errroMessage = validate(required, user);

    //     if (errroMessage) {
    //       setError(errroMessage);
    //       return;
    //     }
    try {
      const response = await api.post("/auth", userData, {
        withCredentials: true,
      });
      const { user, token, message } = response.data;
      setUser(user);
      setSuccess(message);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user,
          token,
        }),
      );
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      errors(error, setError);
    }
  }, []);

  return useMemo(() => {
    return {
      authenticateUser,
      user,
    };
  }, [user, authenticateUser]);
};
