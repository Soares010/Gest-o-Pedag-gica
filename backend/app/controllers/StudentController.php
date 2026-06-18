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

		if ($student->create(json_decode(file_get_contents("php://input"), true))) {
			http_response_code(201);
			echo json_encode([
				"message" => "Aluno registrado com sucesso!"
			]);
			return;
		} else {
			http_response_code(400);
			echo json_encode([
				"message" => "Fala ao registrar aluno!"
			]);
		}
	}
}
