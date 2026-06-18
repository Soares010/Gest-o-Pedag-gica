<?php

namespace App\controllers;

use App\services\StudentService;


class StudentController
{
	public function add()
	{
		$student = new StudentService();

		if (empty(json_decode(file_get_contents("php://input"), true))) {
			http_response_code(400); // Bad Request
			echo json_encode(["message" => "Dados do aluno não foram fornecidos ou são inválidos."]);
			return;
		}

		$result = $student->create(json_decode(file_get_contents("php://input"), true));
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
				"message" => "Aluno registrado com sucesso!"
			]);
			return;
		}

		if ($result === "error") {
			http_response_code(400);
			echo json_encode([
				"status" => "error",
				"message" => "Fala ao registrar aluno!"
			]);
		}
	}

}
