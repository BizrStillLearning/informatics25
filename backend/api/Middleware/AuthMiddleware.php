<?php
namespace api\Middleware;

// Tidak perlu require autoload di sini jika sudah ada di index.php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class AuthMiddleware {
    private static $secret_key = "RS2vl/MEf8siMijF3Sd6W3S3dHM00hyE7/22PRVeLBM=";

    public static function authenticate() {
        $headers = getallheaders();

        // Cek apakah Header Authorization ada (Case-insensitive)
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? null;

        if (!$authHeader) {
            self::sendError("Authorization header missing.");
        }

        // Ambil token setelah kata "Bearer "
        $arr = explode(" ", $authHeader);
        $jwt = $arr[1] ?? '';

        if (empty($jwt)) {
            self::sendError("Token not found or empty.");
        }

        try {
            // Decode dan verifikasi tanda tangan token (HS256)
            // JWT::decode otomatis mengecek 'exp' (expiration time)
            $decoded = JWT::decode($jwt, new Key(self::$secret_key, 'HS256'));

            // Mengembalikan data user (id, role, username) ke Controller
            return $decoded->data;

        } catch (Exception $e) {
            // Menangkap token expired, token salah, atau tanda tangan tidak valid
            self::sendError("Access denied. Session expired or invalid token.");
        }
    }

    private static function sendError($message) {
        // Pastikan header JSON terkirim
        if (!headers_sent()) {
            header('Content-Type: application/json');
        }

        http_response_code(401);
        echo json_encode([
            "status" => false,
            "message" => $message,
            "force_logout" => true
        ]);
        exit();
    }
}