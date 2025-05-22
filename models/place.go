package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Place struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name        string            `bson:"name" json:"name"`
	Location    string            `bson:"location" json:"location"`
	Description string            `bson:"description" json:"description"`
	Category    string            `bson:"category" json:"category"`
	ImageURL    string            `bson:"image_url" json:"image_url"`
	Rating      float64           `bson:"rating" json:"rating"`
	Reviews     []Review          `bson:"reviews" json:"reviews"`
	Coordinates struct {
		Lat float64 `bson:"lat" json:"lat"`
		Lng float64 `bson:"lng" json:"lng"`
	} `bson:"coordinates" json:"coordinates"`
	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}

type Review struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID    primitive.ObjectID `bson:"user_id" json:"user_id"`
	PlaceID   primitive.ObjectID `bson:"place_id" json:"place_id"`
	Rating    float64           `bson:"rating" json:"rating"`
	Comment   string            `bson:"comment" json:"comment"`
	CreatedAt time.Time         `bson:"created_at" json:"created_at"`
}

type RouteRequest struct {
	Origin      string `json:"origin" binding:"required"`
	Destination string `json:"destination" binding:"required"`
	Mode        string `json:"mode" binding:"required"`
}

type RouteResponse struct {
	Distance    string  `json:"distance"`
	Duration    string  `json:"duration"`
	Cost        float64 `json:"cost"`
	Route       []Point `json:"route"`
	TotalMeters int     `json:"total_meters"`
}

type Point struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
}