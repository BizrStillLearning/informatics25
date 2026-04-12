<?php
// Tahan output agar tidak ngerusak header
ob_start();

// Header CORS (Wajib paling atas)
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Sembunyikan error HTML agar Axios tidak bingung
ini_set('display_errors', 0);
error_reporting(E_ALL);

try {
    // Gunakan __DIR__ agar path-nya absolut dan pasti ketemu
    require_once __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/Config/Database.php';
    require_once __DIR__ . '/Models/User.php';
    require_once __DIR__ . '/Models/Mahasiswa.php';
    require_once __DIR__ . '/Controllers/AuthController.php';
    require_once __DIR__ . '/Middleware/AuthMiddleware.php';

    // Inisialisasi dengan Namespace lengkap
    $database = new \api\Config\Database();
    $db = $database->getConnection();

    $authController = new \api\Controllers\AuthController($db);

    // Ambil endpoint (login, check-session, dll)
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $pathSegments = explode('/', trim($uri, '/'));
    $endpoint = end($pathSegments);

    header('Content-Type: application/json');

    if ($endpoint === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"));
        if ($data && isset($data->username)) {
            echo json_encode($authController->login($data->username, $data->password));
        } else {
            echo json_encode(["status" => false, "message" => "Data input kosong"]);
        }
    }

    // 2. ROUTE CHECK SESSION (TAMBAHKAN INI)
    else if ($endpoint === 'check-session' && $_SERVER['REQUEST_METHOD'] === 'GET') {
        echo json_encode($authController->checkSession());
    }

    // 3. JIKA ENDPOINT TIDAK TERDAFTAR
    else {
        http_response_code(404);
        echo json_encode([
            "status" => false,
            "message" => "Endpoint '$endpoint' tidak ditemukan atau Method salah"
        ]);
    }

} catch (\Throwable $th) {
    // JIKA ERROR, KIRIM SEBAGAI JSON (Bukan tabel oranye Xdebug)
    http_response_code(500);
    echo json_encode([
        "status" => false,
        "message" => "PHP Error: " . $th->getMessage(),
        "file" => $th->getFile(),
        "line" => $th->getLine()
    ]);
}

ob_end_flush();