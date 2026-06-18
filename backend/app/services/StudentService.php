<?php

namespace App\services;

use PDO;

class StudentService extends Model
{
	public function create(array $data)
	{

		$sql = "select * from student where email=:email";
		$checkIssetStudent = $this->connect->prepare($sql);
		$checkIssetStudent->bindParam(":email", $data['email'], PDO::PARAM_STR);
		$checkIssetStudent->execute();

		if ($checkIssetStudent->rowCount() > 0) {
			return "email_exists";
		} else {
			$sql = "insert into student (firstname, lastname, borndate, gender, fathername, mothername, grade, classroom, country, province, 
		municipality, phone, email) values (:firstname, :lastname, :borndate, :gender, :fathername, :mothername, :grade, :classroom,
		:country, :province, :municipality, :phone, :email)";
			$create = $this->connect->prepare($sql);
			$create->execute($data);

			if ($create->rowCount() > 0) {
				return "success";
			}
			return "error";
		}
	}
}
