<?php

namespace App\services;

use PDO;

class StudentService extends Model
{
	public function create(array $data)
	{
		$sql = "insert into student (firstname, lastname, borndate, gender, fathername, mothername, grade, classroom, country, province, 
		municipality, phone, email) values (:firstname, :lastname, :borndate, :gender, :fathername, :mothername, :grade, :classroom,
		:country, :province, :municipality, :phone, :email)";
		$create = $this->connect->prepare($sql);
		// $create->bindParam(":firstname", $data['firstname'], PDO::PARAM_STR);
		// $create->bindParam(":lastname", $data['lastname'], PDO::PARAM_STR);
		// $create->bindParam(":borndate", $data['borndate']);
		// $create->bindParam(":gender", $data['gender'], PDO::PARAM_STR);
		// $create->bindParam(":fathername", $data['fathername'], PDO::PARAM_STR);
		// $create->bindParam(":mothername", $data['mothername'], PDO::PARAM_STR);
		// $create->bindParam(":grade", $data['grade'], PDO::PARAM_STR);
		// $create->bindParam(":classroom", $data['classroom'], PDO::PARAM_STR);
		// $create->bindParam(":country", $data['country'], PDO::PARAM_STR);
		// $create->bindParam(":province", $data['province'], PDO::PARAM_STR);
		// $create->bindParam(":municipality", $data['municipality'], PDO::PARAM_STR);
		// $create->bindParam(":phone", $data['phone'], PDO::PARAM_INT);
		// $create->bindParam(":email", $data['email'], PDO::PARAM_STR);
		$create->execute($data);

		if ($create->rowCount() > 0) {
			return true;
		}
		return false;
	}
}
