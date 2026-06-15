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
      console.log(user);
    } catch (error) {
      errors(setError, error);
    }
  }, []);

  return useMemo(() => {
    return {
      user,
      studentAdd,
    };
  }, [user, studentAdd]);
};
