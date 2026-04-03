<?php
namespace api\Controllers;

use api\Models\User;
use api\Models\Mahasiswa;
use api\Middleware\AuthMiddleware;
use Firebase\JWT\JWT;
use Exception;

class AuthController {
    private $db;
    private $userModel;
    private $secret_key = "RS2vl/MEf8siMijF3Sd6W3S3dHM00hyE7/22PRVeLBM=";

    public function __construct($db) {
        $this->db = $db;
        $this->userModel = new User($db);
    }

    public function login($username, $password) {
        try {
            // 1. Verifikasi User
            $user = $this->userModel->findByUsername($username);

            if (!$user || !password_verify($password, $user['password'])) {
                return [
                    "status" => false,
                    "message" => "NIM/Username atau Password salah!"
                ];
            }

            $issuedAt = time();
            $expire = $issuedAt + 10;

            $payload = [
                "iat" => $issuedAt,
                "exp" => $expire,
                "iss" => "informatics25-protocol",
                "data" => [
                    "id" => (int)$user['id'],
                    "role" => $user['role'],
                    "username" => $user['username']
                ]
            ];

            $jwt = JWT::encode($payload, $this->secret_key, 'HS256');

            $profile = [
                'full_name' => '',
                'avatar' => null
            ];

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
                "user" => [
                    "id" => (int)$user['id'],
                    "username" => $user['username'],
                    "role" => $user['role']
                ],
                "profile" => $profile
            ];

        } catch (Exception $e) {
            http_response_code(500);
            return [
                "status" => false,
                "message" => "Critical System Error: " . $e->getMessage()
            ];
        }
    }

    public function checkSession() {
        try {
            // Pastikan AuthMiddleware mengembalikan data payload JWT yang didecode
            $decodedPayload = AuthMiddleware::authenticate();

            return [
                "status" => true,
                "user" => $decodedPayload->data
            ];
        } catch (Exception $e) {
            http_response_code(401);
            return [
                "status" => false,
                "message" => "Session Invalid atau Expired"
            ];
        }
    }
}