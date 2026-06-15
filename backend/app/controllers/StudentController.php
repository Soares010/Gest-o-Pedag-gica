<?php

namespace App\controllers;


class StudentController
{
	public function add()
	{
		$data = json_decode(file_get_contents("php://input"), true);

		echo json_encode([
			"data" => $data
		]);
	}
}
