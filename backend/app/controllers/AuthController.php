<?php

namespace App\controllers;

use App\services\AuthService;

class AuthController
{
	public function auth()
	{
		$auth = new AuthService();
		$auth->authenticate(json_decode(file_get_contents("php://input"), true));
	}
}
