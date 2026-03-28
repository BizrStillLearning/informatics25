<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "status" => false,
        "message" => "Protocol Error: Method " . $_SERVER['REQUEST_METHOD'] . " not allowed. Use POST.",
    ]);
    exit();
}

require_once __DIR__ . '/../vendor/autoload.php';
require_once './config/Database.php';
require_once 'Models/User.php';
require_once 'Models/Mahasiswa.php';
require_once './controllers/AuthController.php';

use api\config\Database;
use api\Controllers\AuthController;

$database = new Database();
$db = $database->getConnection();
$auth = new AuthController($db);

$data = json_decode(file_get_contents("php://input"));

// 2. VALIDASI INPUT
if (!empty($data->username) && !empty($data->password)) {
    $result = $auth->login($data->username, $data->password);

    if ($result['status']) {
        http_response_code(200);
    } else {
        http_response_code(401);
    }
    echo json_encode($result);
} else {
    // 3. HANDLE DATA KOSONG
    http_response_code(400);
    echo json_encode([
        "status" => false,
        "message" => "Username dan Password wajib diisi!"
    ]);
}