<?php

require_once __DIR__ . "/vendor/autoload.php";

use Bramus\Router\Router;

$router = new Router();


// Permitir envio de dados em Json
header('Content-Type: application/json');
// Permitir qualquer origem (para desenvolvimento)
header("Access-Control-Allow-Origin: *");
// Permitir os cabeçalhos usados pela requisição
header("Access-Control-Allow-Headers: Content-Type");
// Permitir métodos específicos
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");





$router->options('/.*', function () {
	http_response_code(200);
	exit();
});

$router->before("POST", "/auth", function () {
	$data = json_decode(file_get_contents('php://input'), true);
	echo (json_encode($data));

	http_response_code(200);

	exit();
});


// Executa o router!
$router->run();
 