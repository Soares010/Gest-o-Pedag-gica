<?php

namespace App\routes;


function getBearerToken()
{
	$headers = getallheaders();
	if (isset($headers['Authorization'])) {
		// O header vem como "Bearer abc123xyz...", pegamos apenas o código após o espaço
		if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
			return $matches[1];
		}
	}
	return null;
}

$router->mount("/auth", function () use ($router) {
	$router->post("/", "AuthController@auth");
});

$router->mount("/students", function () use ($router) {
	$token = getBearerToken();

	if (!$token) {
		http_response_code(401);
		echo json_encode([
			"error" => "Acesso negado usuário não tem permissão"
		]);
		exit;
	}
	$router->post("/add", "StudentController@add");
});
