<?php

namespace App\controllers;

class AuthController
{
	private array $data;
	public function auth()
	{
		$this->data = json_decode(file_get_contents("php://input"), true);
		http_response_code(200);
		echo json_encode($this->data);
	}
}
