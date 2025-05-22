package handlers

import (
	"context"
	"net/http"
	"time"

	"go-smooth/models"
	"go-smooth/utils"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	usersCollection *mongo.Collection
)

// SetUsersCollection sets the users collection
func SetUsersCollection(collection *mongo.Collection) {
	usersCollection = collection
}

// Register handles user registration
func Register(c *gin.Context) {
	var registerData models.RegisterRequest
	if err := c.ShouldBindJSON(&registerData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if email already exists
	var existingUser models.User
	err := usersCollection.FindOne(context.Background(), bson.M{"email": bson.M{"$regex": "^" + registerData.Email + "$", "$options": "i"}}).Decode(&existingUser)
	if err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email already registered"})
		return
	}

	// Hash password
	hashedPassword, err := utils.HashPassword(registerData.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process password"})
		return
	}

	// Create new user
	newUser := models.User{
		ID:        primitive.NewObjectID(),
		Email:     registerData.Email,
		Password:  hashedPassword,
		Name:      registerData.Name,
		Role:      "user", // Default role for new users
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	// Insert user into database
	_, err = usersCollection.InsertOne(context.Background(), newUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	// Generate JWT
	token, err := utils.GenerateJWT(newUser.ID.Hex(), newUser.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Registration successful",
		"user": gin.H{
			"id":    newUser.ID.Hex(),
			"email": newUser.Email,
			"name":  newUser.Name,
			"role":  newUser.Role,
		},
		"token": token,
	})
}

// Login handles user login
func Login(c *gin.Context) {
	var loginData models.LoginRequest
	if err := c.ShouldBindJSON(&loginData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find user by email (case-insensitive)
	var user models.User
	err := usersCollection.FindOne(context.Background(), bson.M{"email": bson.M{"$regex": "^" + loginData.Email + "$", "$options": "i"}}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Check password
	if !utils.CheckPasswordHash(loginData.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Generate JWT
	token, err := utils.GenerateJWT(user.ID.Hex(), user.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"user": gin.H{
			"id":    user.ID.Hex(),
			"email": user.Email,
			"name":  user.Name,
			"role":  user.Role,
		},
		"token": token,
	})
}

// Logout handles user logout
func Logout(c *gin.Context) {
	// For JWT, just let frontend delete the token
	c.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
}

// GetUserProfile returns the current user's profile
func GetUserProfile(c *gin.Context) {
	userID, _ := c.Get("user_id")
	role, _ := c.Get("role")

	c.JSON(http.StatusOK, gin.H{
		"id":   userID,
		"role": role,
	})
}

// UpdateUserProfile updates the current user's profile
func UpdateUserProfile(c *gin.Context) {
	// TODO: Implement profile update
	c.JSON(http.StatusOK, gin.H{"message": "Profile updated"})
}

// GetPlaces returns all places
func GetPlaces(c *gin.Context) {
	// TODO: Implement get places
	c.JSON(http.StatusOK, gin.H{"message": "Get places"})
}

// GetPlace returns a specific place
func GetPlace(c *gin.Context) {
	// TODO: Implement get place
	c.JSON(http.StatusOK, gin.H{"message": "Get place"})
}

// AddReview adds a review to a place
func AddReview(c *gin.Context) {
	// TODO: Implement add review
	c.JSON(http.StatusOK, gin.H{"message": "Review added"})
}

// FindRoute finds a route between two points
func FindRoute(c *gin.Context) {
	// TODO: Implement route finding
	c.JSON(http.StatusOK, gin.H{"message": "Route found"})
}

// EstimateCost estimates the cost of a route
func EstimateCost(c *gin.Context) {
	// TODO: Implement cost estimation
	c.JSON(http.StatusOK, gin.H{"message": "Cost estimated"})
}

// CreatePlace creates a new place (admin only)
func CreatePlace(c *gin.Context) {
	// TODO: Implement create place
	c.JSON(http.StatusOK, gin.H{"message": "Place created"})
}

// UpdatePlace updates a place (admin only)
func UpdatePlace(c *gin.Context) {
	// TODO: Implement update place
	c.JSON(http.StatusOK, gin.H{"message": "Place updated"})
}

// DeletePlace deletes a place (admin only)
func DeletePlace(c *gin.Context) {
	// TODO: Implement delete place
	c.JSON(http.StatusOK, gin.H{"message": "Place deleted"})
}
