<?php

namespace App\controllers;

use App\services\UserService;

class AuthController
{
	private array $data;
	public function auth()
	{

		$auth = new UserService();
		$auth->data = json_decode(file_get_contents("php://input"), true);
		$auth->authenticate();
	}
}
