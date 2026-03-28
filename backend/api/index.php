<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../vendor/autoload.php';
require_once 'Config/Database.php';
require_once 'Models/User.php';
require_once 'Models/Mahasiswa.php';
require_once 'Controllers/AuthController.php';
require_once 'Middleware/AuthMiddleware.php';

use api\Config\Database;
use api\Controllers\AuthController;
use api\Middleware\AuthMiddleware;

$database = new Database();
$db = $database->getConnection();
$authController = new AuthController($db);

// Simple Routing Logic
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);
$endpoint = end($uri);

switch ($endpoint) {
    case 'login':
        $data = json_decode(file_get_contents("php://input"));
        echo json_encode($authController->login($data->username, $data->password));
        break;

    case 'check-session':
        // Endpoint ini HANYA untuk memastikan token masih valid (10 menit belum habis)
        echo json_encode($authController->checkSession());
        break;

    case 'get-mahasiswa-profile':
        // Contoh endpoint yang butuh login
        $userData = AuthMiddleware::authenticate(); // Cek Token
        // Jika lolos, ambil data dari model Mahasiswa
        echo json_encode(["status" => true, "data" => "Detail Profil untuk ID " . $userData->id]);
        break;

    default:
        http_response_code(404);
        echo json_encode(["status" => false, "message" => "Endpoint not found"]);
        break;
}