<?php
namespace App\routes;

$router->mount("/auth", function () use ($router) {

	$router->post("/", "AuthController@auth");
});

$router->mount("/students", function () use ($router) {});
