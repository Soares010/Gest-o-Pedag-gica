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

$router->setNamespace("\App\Controllers");

require_once __DIR__ . "/app/routes/router.php";;



// Executa o router!
$router->run();
