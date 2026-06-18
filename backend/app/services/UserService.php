<?php

namespace App\services;

use PDO;

class UserService extends Model
{
	protected string $table = "users";
	private int $id;

	public function create(array $data)
	{
		$sql = "select * from {$this->table} where email=:email";
		$checkUser = $this->connect->prepare($sql);
		$checkUser->bindParam(":email", $data['email'], PDO::PARAM_STR);
		$checkUser->execute();

		if ($checkUser->rowCount() > 0) {
			return "user_exists";
		} else {
			// 1. Criptografa a senha no array original
			$data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

			// 2. Mapeia estritamente apenas o que o seu INSERT precisa
			// Isso ignora os campos extras (classroom, grade, province) que causavam o erro.
			$dadosUsuario = [
				':firstname'     => $data['firstname'],
				':lastname'      => $data['lastname'],
				':email'         => $data['email'],
				':password'      => $data['password'],
				':country'       => $data['country'],
				':municipality'  => $data['municipality'],
				':phone'         => $data['phone'],
				':gender'        => $data['gender'],
				':borndate'      => $data['borndate'],
				':academiclevel' => $data['academiclevel'] ?? null
			];

			$sql = "insert into {$this->table} (firstname, lastname, email, password, country, municipality, phone, gender, borndate, academiclevel)
			values (:firstname, :lastname, :email, :password,:country,:municipality, :phone, :gender, :borndate, :academiclevel)";

			$create = $this->connect->prepare($sql);

			// 3. Passa o array filtrado com o número exato de parâmetros
			$create->execute($dadosUsuario);

			if ($create->rowCount() > 0) {
				$this->id = $this->connect->lastInsertId();

				// Passa o $data original completo para o createOffice, 
				// pois ele vai precisar ler os dados profissionais lá dentro.
				$this->createOffice($this->id, $data);
				return "success";
			}
			return "error";
		}
	}

	public function createOffice(int $id, array $data)
	{

		$officeName = $data['office'] ?? null;

		$sql = "insert into office (name, id_user) values (:name, :id)";
		$createOffice = $this->connect->prepare($sql);
		$createOffice->bindParam(":name", $officeName, PDO::PARAM_STR);
		$createOffice->bindParam(":id", $id, PDO::PARAM_INT);
		$createOffice->execute();
	}





	public function show() {}
	public function update() {}
	public function delete() {}
}
