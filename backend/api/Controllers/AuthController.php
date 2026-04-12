<?php
namespace api\Controllers;

use api\Models\User;
use api\Models\Mahasiswa;
use api\Middleware\AuthMiddleware;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class AuthController {
    private $db;
    private $userModel;
    private $secret_key = "RS2vl/MEf8siMijF3Sd6W3S3dHM00hyE7/22PRVeLBM=";

    public function __construct($db) {
        $this->db = $db;
        $this->userModel = new User($db);
    }

    /**
     * Menangani proses Login
     */
    public function login($username, $password) {
        try {
            $user = $this->userModel->findByUsername($username);

            // Validasi User & Password
            if (!$user || !password_verify($password, $user['password'])) {
                return [
                    "status" => false,
                    "message" => "NIM/Username atau Password salah!"
                ];
            }

            // Pengaturan Waktu JWT
            $issuedAt = time();
            $duration = 60 * 60 * 24; // 24 jam
            $expire = $issuedAt + $duration;

            // Payload Token (Pastikan data tersimpan di key 'data')
            $payload = [
                "iat" => $issuedAt,
                "exp" => $expire,
                "iss" => "informatics25-protocol",
                "data" => [
                    "id" => (int)$user['id'],
                    "username" => $user['username'],
                    "role" => $user['role']
                ]
            ];

            // Generate JWT
            $jwt = JWT::encode($payload, $this->secret_key, 'HS256');

            // Ambil Data Profil
            $profile = ['full_name' => '', 'avatar' => null];
            if ($user['role'] === 'mahasiswa') {
                $mhsModel = new Mahasiswa($this->db);
                $mhsData = $mhsModel->findByUserId($user['id']);
                $profile['full_name'] = $mhsData['nama_lengkap'] ?? $user['username'];
                $profile['avatar'] = $mhsData['foto'] ?? null;
            } else {
                $profile['full_name'] = $user['username'];
                $profile['avatar'] = 'admin_default.svg';
            }

            return [
                "status" => true,
                "message" => "Login Success",
                "token" => $jwt,
                "expires_in" => $duration,
                "user" => $payload['data'], // Langsung ambil dari payload agar konsisten
                "profile" => $profile
            ];

        } catch (Exception $e) {
            http_response_code(500);
            return [
                "status" => false,
                "message" => "Server Error: " . $e->getMessage()
            ];
        }
    }

    /**
     * Mengecek validitas sesi berdasarkan Token yang dikirim di Header
     */
    public function checkSession() {
        try {
            // Middleware akan melakukan decode JWT.
            // Pastikan AuthMiddleware::authenticate() mengembalikan hasil JWT::decode()
            $decoded = AuthMiddleware::authenticate();

            // Validasi apakah properti 'data' dan 'exp' ada
            if (!isset($decoded->data) || !isset($decoded->exp)) {
                throw new Exception("Payload token tidak lengkap.");
            }

            $now = time();
            $remaining = $decoded->exp - $now;

            // Jika waktu expired sudah lewat
            if ($remaining <= 0) {
                http_response_code(401);
                return [
                    "status" => false,
                    "message" => "Sesi telah berakhir."
                ];
            }

            return [
                "status" => true,
                "user" => [
                    "id" => (int)($decoded->data->id ?? 0),
                    "username" => $decoded->data->username ?? 'Unknown',
                    "role" => $decoded->data->role ?? 'guest'
                ],
                "remaining_time" => $remaining
            ];

        } catch (Exception $e) {
            // Tangani error decode (token salah, expired, dll)
            http_response_code(401);
            return [
                "status" => false,
                "message" => "Unauthorized: " . $e->getMessage()
            ];
        }
    }
}