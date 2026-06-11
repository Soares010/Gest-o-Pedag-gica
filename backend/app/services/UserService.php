<?php

namespace App\services;


class UserService extends Model
{
	protected string $table = "users";
	public array $data;

	public function authenticate()
	{
		if ($this->connect) {
			http_response_code(200);
			echo json_encode($this->data);
		}
	}

	public function create() {}
	public function show() {}
	public function update() {}
	public function delete() {}
}
