package main

import (
	"net/http"

	"github.com/BizrStillLearning/informatics25/backend/config"
	"github.com/BizrStillLearning/informatics25/backend/internal/handler"
	"github.com/BizrStillLearning/informatics25/backend/internal/middleware"
	"github.com/BizrStillLearning/informatics25/backend/internal/model"
	"github.com/BizrStillLearning/informatics25/backend/internal/service"
	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDatabase()
	config.DB.AutoMigrate(&model.User{})
	config.DB.AutoMigrate(&model.User{}, &model.Mahasiswa{})

	authService := service.NewAuthService()
	authHandler := handler.NewAuthHandler(authService)

	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	api := r.Group("/api")
	{
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "Informatics 25 Backend Active"})
		})

		auth := api.Group("/auth")
		{
			auth.POST("/login", authHandler.Login)
			auth.GET("/login", func(c *gin.Context) {
				c.JSON(http.StatusMethodNotAllowed, gin.H{"status": false, "message": "Gunakan POST!"})
			})
		}

		system := api.Group("/system")
		system.Use(middleware.AuthMiddleware())
		{
			system.GET("/check-session", func(c *gin.Context) {
				userID, _ := c.Get("user_id")
				username, _ := c.Get("username")
				role, _ := c.Get("role")

				c.JSON(http.StatusOK, gin.H{
					"status": true,
					"user": gin.H{
						"id":       userID,
						"username": username,
						"role":     role,
					},
					"message": "Session is valid",
				})
			})

		}
	}

	r.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{"status": false, "message": "Endpoint tidak ditemukan"})
	})

	r.Run(":8080")
}
