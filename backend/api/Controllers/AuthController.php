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
            $user = $this->userModel->findByUsername($username);

            if (!$user || !password_verify($password, $user['password'])) {
                return ["status" => false, "message" => "NIM/Username atau Password salah!"];
            }

            $issuedAt = time();
            $expire = $issuedAt + 600; // 10 Menit

            $payload = [
                "iat" => $issuedAt,
                "exp" => $expire,
                "iss" => "informatics25-protocol",
                "data" => [
                    "id" => $user['id'],
                    "role" => $user['role'],
                    "username" => $user['username']
                ]
            ];

            $jwt = JWT::encode($payload, $this->secret_key, 'HS256');

            // --- LOGIC PROFIL ---
            $profile = null;
            if ($user['role'] === 'mahasiswa') {
                $mhsModel = new Mahasiswa($this->db);
                $profile = $mhsModel->findByUserId($user['id']);
            } else {
                // Jika admin, buat profil sederhana
                $profile = ['full_name' => 'Administrator', 'avatar' => 'admin.jpg'];
            }

            return [
                "status" => true,
                "message" => "Login Success",
                "token" => $jwt,
                "role" => $user['role'],
                "profile" => $profile // Data profil dikirim ke FE
            ];

        } catch (Exception $e) {
            http_response_code(500);
            return ["status" => false, "message" => "Server Error: " . $e->getMessage()];
        }
    }

    public function checkSession() {
        try {
            $userData = AuthMiddleware::authenticate();
            return [
                "status" => true,
                "user" => $userData
            ];
        } catch (Exception $e) {
            return ["status" => false, "message" => "Invalid Session"];
        }
    }
}