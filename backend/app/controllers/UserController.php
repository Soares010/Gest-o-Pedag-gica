<?php

namespace App\controllers;

use App\services\UserService;

class UserController
{

	public function add()
	{
		$user = new UserService();

		$result = $user->create(json_decode(file_get_contents("php://input"), true));

		if ($result === "email_exists") {
			http_response_code(400);
			echo json_encode([
				"status" => "error",
				"message" => "Impossível registrar, este e-mail já está cadastrado!"
			]);
			return;
		}

		if ($result === "success") {
			http_response_code(201);
			echo json_encode([
				"status" => "success",
				"message" => "Usuário registrado com sucesso!"
			]);
			return;
		}
		if ($result === "error") {
			http_response_code(400);
			echo json_encode([
				"status" => "error",
				"message" => "Fala ao registrar usuário!"
			]);
		}
	}
}
