<?php
namespace api\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class AuthMiddleware {
    private static $secret_key = "RS2vl/MEf8siMijF3Sd6W3S3dHM00hyE7/22PRVeLBM=";

    public static function authenticate() {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? null;

        if (!$authHeader) {
            $headers = getallheaders();
            $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? null;
        }

        if (!$authHeader) {
            self::sendError("Authorization header missing.");
        }

        if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $jwt = $matches[1];
        } else {
            self::sendError("Token format invalid. Use 'Bearer [token]'");
        }

        try {
            // 3. Decode Token
            $decoded = JWT::decode($jwt, new Key(self::$secret_key, 'HS256'));

            // --- KESALAHAN KAMU DISINI SEBELUMNYA ---
            // Kamu harus mengembalikan SELURUH objek $decoded, bukan cuma $decoded->data
            // Agar AuthController bisa baca $decoded->exp dan $decoded->data
            return $decoded;

        } catch (Exception $e) {
            // Menangkap token expired atau invalid
            self::sendError("Sesi berakhir atau token tidak valid: " . $e->getMessage());
        }
    }

    private static function sendError($message) {
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