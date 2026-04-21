package service

import (
	"errors"

	"github.com/BizrStillLearning/informatics25/backend/config"
	"github.com/BizrStillLearning/informatics25/backend/internal/model"
	"github.com/BizrStillLearning/informatics25/backend/internal/utils"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthService interface {
	Login(username, password string) (string, model.User, error)
}

type authService struct{}

func NewAuthService() AuthService {
	return &authService{}
}

func (s *authService) Login(username, password string) (string, model.User, error) {
	var user model.User

	err := config.DB.Preload("Mahasiswa").Where("username = ?", username).First(&user).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return "", user, errors.New("User tidak ditemukan")
		}
		return "", user, errors.New("Terjadi kesalahan pada database")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return "", user, errors.New("Password salah")
	}

	token, err := utils.GenerateToken(user.ID, user.Username, user.Role)
	if err != nil {
		return "", user, errors.New("Gagal generate session")
	}

	return token, user, nil
}
