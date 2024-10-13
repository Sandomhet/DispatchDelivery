package constants

import (
	"fmt"
	"net/http"
	"net/url"
	"os"
	"time"
)

const (
	ORDER_INDEX    = "order"
	USER_INDEX     = "user"
	STRIPE_API_KEY = "sk_test_51P7ZK4IPesYaCTIpvs3UipNI8B8xrAPk1TTA8kRLEQ7FCtAGUdZVjXQFk3q7cEnkRV1GfCgzXUZO8wBKLS6Xm8jd00DupsUMHO"
	MAP_API_KEY    = "AIzaSyA6no3J1oLtfvKm8okja-D0kxcz47KzD3k"
	DRONE_VELOCITY = 70.0 // km/h
	ROBOT_CHARGE   = 8  // $/km
	DRONE_CHARGE   = 15  // $/km
	DB_USER        = "flagcamp"
	DB_PASSWORD    = "flagcamp"
	DB_HOST        = "localhost"
	DB_PORT        = "3306"
	DB_NAME        = "mydb"
	// DB_HOST        = "mysql-container"
)

var Client *http.Client

func ProxySet() {
	proxyURL, err := url.Parse("http://127.0.0.1:10808")
	if err != nil {
		fmt.Println("Invalid proxy URL:", err)
		os.Exit(1)
	}
	transport := &http.Transport{
		Proxy: http.ProxyURL(proxyURL),
	}
	Client = &http.Client{
		Transport: transport,
		Timeout:   10 * time.Second,
	}
}
