package middleware

import (
	"net/http"
	"strings"

	"github.com/BizrStillLearning/informatics25/backend/internal/utils"
	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status":  false,
				"message": "Authorization header is required",
			})
			c.Abort()
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if !(len(parts) == 2 && parts[0] == "Bearer") {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status":  false,
				"message": "Authorization format must be Bearer [token]",
			})
			c.Abort()
			return
		}

		claims, err := utils.ValidateToken(parts[1])
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status":       false,
				"message":      "Sesi berakhir atau token tidak valid: " + err.Error(),
				"force_logout": true,
			})
			c.Abort()
			return
		}

		c.Set("user_id", claims.Data.ID)
		c.Set("username", claims.Data.Username)
		c.Set("role", claims.Data.Role)

		c.Next()
	}
}
