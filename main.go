package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"go-smooth/handlers"
	"go-smooth/middleware"
	"go-smooth/models"
	"go-smooth/utils"
)

var (
	client  *mongo.Client
	db      *mongo.Database
	places  *mongo.Collection
	routes  *mongo.Collection
	reviews *mongo.Collection
	users   *mongo.Collection
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Connect to MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(os.Getenv("MONGODB_URI"))
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	// Initialize database and collections
	db = client.Database("go_smooth")

	// Create collections if they don't exist
	collections := []string{"places", "routes", "reviews", "users"}
	for _, collection := range collections {
		err = db.CreateCollection(ctx, collection)
		if err != nil {
			// Collection might already exist, which is fine
			log.Printf("Collection %s might already exist: %v", collection, err)
		}
	}

	// Get collections
	places = db.Collection("places")
	routes = db.Collection("routes")
	reviews = db.Collection("reviews")
	users = db.Collection("users")

	// Set users collection in handlers
	handlers.SetUsersCollection(users)

	// Create indexes
	createIndexes(ctx)

	// Create admin user if it doesn't exist
	createAdminUser(ctx)

	log.Println("Connected to MongoDB and initialized collections!")

	// Initialize router
	router := gin.Default()

	// Configure CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:8080", "http://localhost:8081"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	// Initialize routes
	initializeRoutes(router)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s...", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}

func createAdminUser(ctx context.Context) {
	// Check if admin user exists
	var adminUser models.User
	err := users.FindOne(ctx, bson.M{"email": "Admin001@go-smooth.co.th"}).Decode(&adminUser)
	if err == nil {
		// Admin user already exists
		return
	}

	// Hash admin password
	hashedPassword, err := utils.HashPassword("g999063")
	if err != nil {
		log.Printf("Error hashing admin password: %v", err)
		return
	}

	// Create admin user
	adminUser = models.User{
		ID:        primitive.NewObjectID(),
		Email:     "Admin001@go-smooth.co.th",
		Password:  hashedPassword,
		Name:      "Admin",
		Role:      "admin",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	// Insert admin user
	_, err = users.InsertOne(ctx, adminUser)
	if err != nil {
		log.Printf("Error creating admin user: %v", err)
		return
	}

	log.Println("Admin user created successfully")
}

func createIndexes(ctx context.Context) {
	// Create indexes for places collection
	placeIndexes := []mongo.IndexModel{
		{
			Keys: map[string]interface{}{
				"name": 1,
			},
		},
		{
			Keys: map[string]interface{}{
				"category": 1,
			},
		},
		{
			Keys: map[string]interface{}{
				"coordinates.lat": 1,
				"coordinates.lng": 1,
			},
		},
	}

	// Create indexes for routes collection
	routeIndexes := []mongo.IndexModel{
		{
			Keys: map[string]interface{}{
				"start_loc_id": 1,
				"end_loc_id":   1,
			},
		},
	}

	// Create indexes for reviews collection
	reviewIndexes := []mongo.IndexModel{
		{
			Keys: map[string]interface{}{
				"place_id": 1,
			},
		},
		{
			Keys: map[string]interface{}{
				"user_id": 1,
			},
		},
	}

	// Create indexes for users collection
	userIndexes := []mongo.IndexModel{
		{
			Keys: map[string]interface{}{
				"email": 1,
			},
			Options: options.Index().SetUnique(true),
		},
	}

	// Create all indexes
	if _, err := places.Indexes().CreateMany(ctx, placeIndexes); err != nil {
		log.Printf("Error creating place indexes: %v", err)
	}

	if _, err := routes.Indexes().CreateMany(ctx, routeIndexes); err != nil {
		log.Printf("Error creating route indexes: %v", err)
	}

	if _, err := reviews.Indexes().CreateMany(ctx, reviewIndexes); err != nil {
		log.Printf("Error creating review indexes: %v", err)
	}

	if _, err := users.Indexes().CreateMany(ctx, userIndexes); err != nil {
		log.Printf("Error creating user indexes: %v", err)
	}

	// Create validation rules for collections
	createCollectionValidation(ctx)
}

func createCollectionValidation(ctx context.Context) {
	// Validation rules for places collection
	placesValidator := bson.M{
		"$jsonSchema": bson.M{
			"bsonType": "object",
			"required": []string{"name", "location", "category", "coordinates"},
			"properties": bson.M{
				"name": bson.M{
					"bsonType":    "string",
					"description": "must be a string and is required",
				},
				"location": bson.M{
					"bsonType":    "string",
					"description": "must be a string and is required",
				},
				"category": bson.M{
					"bsonType":    "string",
					"description": "must be a string and is required",
				},
				"coordinates": bson.M{
					"bsonType": "object",
					"required": []string{"lat", "lng"},
					"properties": bson.M{
						"lat": bson.M{"bsonType": "double"},
						"lng": bson.M{"bsonType": "double"},
					},
				},
			},
		},
	}

	// Validation rules for reviews collection
	reviewsValidator := bson.M{
		"$jsonSchema": bson.M{
			"bsonType": "object",
			"required": []string{"user_id", "place_id", "rating", "comment"},
			"properties": bson.M{
				"user_id": bson.M{
					"bsonType":    "objectId",
					"description": "must be an ObjectId and is required",
				},
				"place_id": bson.M{
					"bsonType":    "objectId",
					"description": "must be an ObjectId and is required",
				},
				"rating": bson.M{
					"bsonType":    "double",
					"minimum":     1,
					"maximum":     5,
					"description": "must be a number between 1 and 5",
				},
				"comment": bson.M{
					"bsonType":    "string",
					"description": "must be a string and is required",
				},
			},
		},
	}

	// Apply validation rules
	opts := options.CreateCollection().SetValidator(placesValidator)
	err := db.CreateCollection(ctx, "places", opts)
	if err != nil {
		log.Printf("Error creating places collection with validation: %v", err)
	}

	opts = options.CreateCollection().SetValidator(reviewsValidator)
	err = db.CreateCollection(ctx, "reviews", opts)
	if err != nil {
		log.Printf("Error creating reviews collection with validation: %v", err)
	}
}

func initializeRoutes(router *gin.Engine) {
	// Public routes
	router.POST("/api/auth/register", handlers.Register)
	router.POST("/api/auth/login", handlers.Login)
	router.POST("/api/auth/logout", handlers.Logout)

	// Protected routes
	protected := router.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		// User routes
		protected.GET("/user/me", handlers.GetUserProfile)
		protected.PUT("/user/me", handlers.UpdateUserProfile)

		// Places routes
		protected.GET("/places", handlers.GetPlaces)
		protected.GET("/places/:id", handlers.GetPlace)
		protected.POST("/places/:id/reviews", handlers.AddReview)

		// Routes finder
		protected.POST("/routes/find", handlers.FindRoute)
		protected.GET("/routes/estimate-cost", handlers.EstimateCost)

		// Admin routes
		admin := protected.Group("/admin")
		admin.Use(middleware.AdminMiddleware())
		{
			admin.POST("/places", handlers.CreatePlace)
			admin.PUT("/places/:id", handlers.UpdatePlace)
			admin.DELETE("/places/:id", handlers.DeletePlace)
		}
	}
}
