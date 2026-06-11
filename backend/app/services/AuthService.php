<?php

namespace App\services;

use PDO;
use Firebase\JWT\JWT;

class AuthService extends Model
{
	protected string $table = "users";

	public function __construct()
	{
		parent::__construct();
		// Garante que a sessão está ativa para ler/gravar as tentativas
		if (session_status() === PHP_SESSION_NONE) {
			session_start();
		}
	}

	public function authenticate(array $data)
	{
		$now = time();
		$emailKey = md5($data['email']);

		// Verifica se está bloqueado temporariamente
		if (isset($_SESSION['blocked_until'][$emailKey])) {
			$blockedUntil = $_SESSION['blocked_until'][$emailKey];

			if ($now < $blockedUntil) {
				$secondsLeft = $blockedUntil - $now;
				http_response_code(429);
				echo json_encode([
					"message" => "Muitas tentativas. Conta bloqueada temporariamente.",
					"seconds_left" => $secondsLeft
				]);
				return;
			} else {
				// O tempo de bloqueio já passou, limpa a sessão deste e-mail
				unset($_SESSION['blocked_until'][$emailKey]);
				unset($_SESSION['login_attempts'][$emailKey]);
			}
		}

		$sql = "select * from {$this->table} inner join office on {$this->table}.id = office.id_user and {$this->table}.email=:email";
		$user = $this->connect->prepare($sql);
		$user->bindParam(":email", $data['email'], PDO::PARAM_STR);

		if ($user->execute()) {
			$result = $user->fetch(PDO::FETCH_ASSOC);

			if ($result && password_verify($data['password'], $result['password'])) {


				unset($_SESSION['login_attempts'][$emailKey]);
				unset($_SESSION['blocked_until'][$emailKey]);

				unset($result['password']);
				$key = $_ENV['JWT_SECRET'];


				$payload = [
					"iat" => $now,        // Issued At
					"exp" => $now + 3600, // Expiration
					"data" => [
						"id" => $result['id'],
						"email" => $result['email']
					]
				];

				$token = JWT::encode($payload, $key, 'HS256');

				http_response_code(200);
				echo json_encode([
					"message" => "Autenticado com sucesso",
					"user" => $result,
					"token" => $token
				]);
				return;
			}
		}

		// Se chegou aqui, as credenciais estão incorretas
		if (!isset($_SESSION['login_attempts'][$emailKey])) {
			$_SESSION['login_attempts'][$emailKey] = 0;
		}

		$_SESSION['login_attempts'][$emailKey]++;

		// Se atingir 3 tentativas erradas, bloqueia por 1 minuto (60 segundos)
		if ($_SESSION['login_attempts'][$emailKey] >= 3) {
			$_SESSION['blocked_until'][$emailKey] = $now + 60;

			http_response_code(429);
			echo json_encode([
				"message" => "Muitas tentativas erradas. Bloqueado por 1 minuto.",
				"seconds_left" => 60
			]);
			return;
		}

		// Retorno padrão de erro se ainda não bloqueou
		http_response_code(401);
		echo json_encode([
			"message" => "E-mail ou senha incorretos"
		]);
	}
}
