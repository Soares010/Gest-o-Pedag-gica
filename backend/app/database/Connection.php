<?php

namespace App\Database;

use PDO;
use PDOException;

class Connection
{
	public static function getInstance()
	{
		try {
			$host = $_ENV['DB_HOST'];
			$db   = $_ENV['DB_DATABASE'];
			$user = $_ENV['DB_USERNAME'];
			$pass = $_ENV['DB_PASSWORD'] ?? '';
			$port = $_ENV['DB_PORT'];

			// Montando a conexão PDO
			$connect = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";

			return new PDO($connect, $user, $pass, [
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
				PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
			]);
		} catch (PDOException $error) {
			// Em produção, não mostre o erro real para o usuário!
			die("Erro de conexão: " . $error->getMessage());
		}
	}
}
