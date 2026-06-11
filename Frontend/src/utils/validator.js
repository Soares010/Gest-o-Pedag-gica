export const validate = (required, data) => {
  const emptyField = required.some((field) => {
    const value = data[field];

    if (value === null || value === undefined || !value) {
      return true;
    }

    if (value.trim() === "") {
      return true;
    }

    return false;
  });

  if (emptyField) {
    const message = "Precisa preencher todos os campos!";
    return message;
  }
  return null;
};

export const passwordValidate = (password, passwordConfirm) => {
  let message = "";

  if (passwordConfirm === null || passwordConfirm === undefined) {
    message = "Os campos de senha são obrigatórios!";
    return message;
  }

  if (password.length < 8) {
    message = "A senha precisa ter 8 caracteres";
    return message;
  }

  if (passwordConfirm === "" || passwordConfirm === undefined) {
    message = "Precisa confirmar a senha!";
    return message;
  }

  if (passwordConfirm != password) {
    message = "As senhas digitadas não coincidem!";
    return message;
  }

  return null;
};
