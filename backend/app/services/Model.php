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

	abstract public function create();
	abstract public function update();
	abstract public function delete();
	abstract public function show();
}
