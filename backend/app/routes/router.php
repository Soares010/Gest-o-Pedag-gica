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


$router->mount("/user", function () use ($router) {

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		return; // Sai sem validar o token, permitindo o preflight prosseguir
	}

	$token = getBearerToken();

	if (!$token) {
		http_response_code(401);
		echo json_encode([
			"error" => "Acesso negado: token ausente"
		]);
		exit;
	}
	$router->post("/add", "UserController@add");
});

$router->mount("/students", function () use ($router) {
	// Adicione esta verificação de segurança para o CORS Preflight
	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		return; // Sai sem validar o token, permitindo o preflight prosseguir
	}

	$token = getBearerToken();

	if (!$token) {
		http_response_code(401);
		echo json_encode([
			"error" => "Acesso negado: token ausente"
		]);
		exit;
	}
	$router->post("/add", "StudentController@add");
});
