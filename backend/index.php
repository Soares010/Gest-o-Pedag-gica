<?php

require_once __DIR__ . "/vendor/autoload.php";

use Bramus\Router\Router;

$router = new Router();


header("Acess-Control-Allow-Origin: *");
header("Content-Type: application/json; charset-UTF8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-with");


$router->options('/.*', function () {
	http_response_code(200);
	exit();
});


// Executa o router!
$router->run();
