package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Location represents a place in the system
type Location struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name        string             `bson:"name" json:"name"`
	Description string             `bson:"description" json:"description"`
	Category    string             `bson:"category" json:"category"`
	Latitude    float64            `bson:"latitude" json:"latitude"`
	Longitude   float64            `bson:"longitude" json:"longitude"`
	Address     string             `bson:"address" json:"address"`
	Images      []string           `bson:"images" json:"images"`
	CreatedAt   time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt   time.Time          `bson:"updated_at" json:"updated_at"`
}

// Route represents a route between two locations
type Route struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	StartLocID    primitive.ObjectID `bson:"start_loc_id" json:"start_loc_id"`
	EndLocID      primitive.ObjectID `bson:"end_loc_id" json:"end_loc_id"`
	Distance      float64            `bson:"distance" json:"distance"`             // in kilometers
	Duration      int                `bson:"duration" json:"duration"`             // in minutes
	Cost          float64            `bson:"cost" json:"cost"`                     // estimated cost
	TransportMode string             `bson:"transport_mode" json:"transport_mode"` // driving, walking, etc.
	CreatedAt     time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt     time.Time          `bson:"updated_at" json:"updated_at"`
}
