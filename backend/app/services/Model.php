<?php

namespace App\services;

use App\Database\Connection;
use PDO;

abstract class Model
{
	protected string $table;
	protected PDO $connect;

	public function __construct()
	{
		$this->connect = Connection::getInstance();
	}
}
