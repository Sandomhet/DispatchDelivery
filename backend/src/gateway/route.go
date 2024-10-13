package gateway

import (
	"src/constants"
	"encoding/json"
	"fmt"
	"io"
	"math"
	"net/http"
	"net/url"
)

const apiKey = constants.MAP_API_KEY

// Robot Route
type DistanceMatrixResponse struct {
	DestinationAddresses []string `json:"destination_addresses"`
	OriginAddresses      []string `json:"origin_addresses"`
	Rows                 []struct {
		Elements []struct {
			Distance struct {
				Text  string `json:"text"`
				Value int    `json:"value"`
			} `json:"distance"`
			Duration struct {
				Text  string `json:"text"`
				Value int    `json:"value"`
			} `json:"duration"`
			Status string `json:"status"`
		} `json:"elements"`
	} `json:"rows"`
	Status string `json:"status"`
}

func getDistanceMatrix(origin, destination string) (*DistanceMatrixResponse, error) {
	baseURL := "https://maps.googleapis.com/maps/api/distancematrix/json"
	params := url.Values{}
	params.Add("origins", origin)
	params.Add("destinations", destination)
	params.Add("key", apiKey)

	requestURL := fmt.Sprintf("%s?%s", baseURL, params.Encode())
	resp, err := http.Get(requestURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var distanceMatrixResponse DistanceMatrixResponse
	err = json.Unmarshal(body, &distanceMatrixResponse)
	if err != nil {
		return nil, err
	}

	return &distanceMatrixResponse, nil
}
func GetRobotRoute(origin, destination string) (float64, int, error) {
	response, err := getDistanceMatrix(origin, destination)
	if err != nil {
		// log.Fatalf("Failed to get distance matrix: %v", err)
		return 0.0, 0, fmt.Errorf("failed to get distance matrix: %v", err)
	}
	if response.Status != "OK" {
		// log.Fatalf("Error in response: %s", response.Status)
		return 0.0, 0, fmt.Errorf("error in response: %s", response.Status)
	}

	if len(response.Rows) <= 0 || len(response.Rows[0].Elements) <= 0 || response.Rows[0].Elements[0].Status != "OK" {
		fmt.Printf("Error in response")
		return 0.0, 0, fmt.Errorf("invalid response data")
	}

	distance := float64(response.Rows[0].Elements[0].Distance.Value) / 1000
	duration := response.Rows[0].Elements[0].Distance.Value/60 + 1
	fmt.Printf("Distance: %.1f km, Duration: %d mins\n", distance, duration)
	return distance, duration, nil
}

// Drone Route
type GeocodingResponse struct {
	Results []struct {
		Geometry struct {
			Location struct {
				Lat float64 `json:"lat"`
				Lng float64 `json:"lng"`
			} `json:"location"`
		} `json:"geometry"`
	} `json:"results"`
	Status string `json:"status"`
}

func getCoordinates(address string) (float64, float64, error) {
	baseURL := "https://maps.googleapis.com/maps/api/geocode/json"
	params := url.Values{}
	params.Add("address", address)
	params.Add("key", apiKey)

	requestURL := fmt.Sprintf("%s?%s", baseURL, params.Encode())
	resp, err := http.Get(requestURL)
	if err != nil {
		return 0, 0, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return 0, 0, err
	}

	var geocodingResponse GeocodingResponse
	err = json.Unmarshal(body, &geocodingResponse)
	if err != nil {
		return 0, 0, err
	}
	if geocodingResponse.Status != "OK" {
		return 0, 0, fmt.Errorf("error in geocoding response: %s", geocodingResponse.Status)
	}
	if len(geocodingResponse.Results) == 0 {
		return 0, 0, fmt.Errorf("no results found for address: %s", address)
	}

	location := geocodingResponse.Results[0].Geometry.Location
	return location.Lat, location.Lng, nil
}
func haversine(lat1, lon1, lat2, lon2 float64) float64 {
	const R = 6371 // Radius of the Earth in km
	dLat := (lat2 - lat1) * (math.Pi / 180)
	dLon := (lon2 - lon1) * (math.Pi / 180)
	a := math.Sin(dLat/2)*math.Sin(dLat/2) + math.Cos(lat1*(math.Pi/180))*math.Cos(lat2*(math.Pi/180))*math.Sin(dLon/2)*math.Sin(dLon/2)
	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))
	distance := R * c // Distance in km
	return distance
}
func GetDroneRoute(origin, destination string) (float64, int, error) {
	// Get coordinates for origin
	originLat, originLon, err := getCoordinates(origin)
	if err != nil {
		// log.Fatalf("Failed to get coordinates for origin: %v", err)
		return 0.0, 0, fmt.Errorf("failed to get coordinates for origin: %v", err)
	}
	// Get coordinates for destination
	destLat, destLon, err := getCoordinates(destination)
	if err != nil {
		// log.Fatalf("Failed to get coordinates for destination: %v", err)
		return 0.0, 0, fmt.Errorf("failed to get coordinates for destination: %v", err)
	}
	// Calculate the straight-line distance using the Haversine formula
	distance := haversine(originLat, originLon, destLat, destLon)
	duration := int(distance/constants.DRONE_VELOCITY*60 + 1)
	fmt.Printf("Distance: %.1f km, Duration: %d mins\n", distance, duration)
	return distance, duration, nil
}

// Proxy
// func getDistanceMatrix(origin, destination string) (*DistanceMatrixResponse, error) {
// 	baseURL := "https://maps.googleapis.com/maps/api/distancematrix/json"
// 	params := url.Values{}
// 	params.Add("origins", origin)
// 	params.Add("destinations", destination)
// 	params.Add("key", apiKey)

// 	requestURL := fmt.Sprintf("%s?%s", baseURL, params.Encode())
// 	resp, err := constants.Client.Get(requestURL)
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer resp.Body.Close()

// 	body, err := io.ReadAll(resp.Body)
// 	if err != nil {
// 		return nil, err
// 	}

// 	var distanceMatrixResponse DistanceMatrixResponse
// 	err = json.Unmarshal(body, &distanceMatrixResponse)
// 	if err != nil {
// 		return nil, err
// 	}

// 	return &distanceMatrixResponse, nil
// }
// func getCoordinates(address string) (float64, float64, error) {
// 	baseURL := "https://maps.googleapis.com/maps/api/geocode/json"
// 	params := url.Values{}
// 	params.Add("address", address)
// 	params.Add("key", apiKey)

// 	requestURL := fmt.Sprintf("%s?%s", baseURL, params.Encode())
// 	resp, err := constants.Client.Get(requestURL)
// 	if err != nil {
// 		return 0, 0, err
// 	}
// 	defer resp.Body.Close()

// 	body, err := io.ReadAll(resp.Body)
// 	if err != nil {
// 		return 0, 0, err
// 	}

// 	var geocodingResponse GeocodingResponse
// 	err = json.Unmarshal(body, &geocodingResponse)
// 	if err != nil {
// 		return 0, 0, err
// 	}
// 	if geocodingResponse.Status != "OK" {
// 		return 0, 0, fmt.Errorf("error in geocoding response: %s", geocodingResponse.Status)
// 	}
// 	if len(geocodingResponse.Results) == 0 {
// 		return 0, 0, fmt.Errorf("no results found for address: %s", address)
// 	}

// 	location := geocodingResponse.Results[0].Geometry.Location
// 	return location.Lat, location.Lng, nil
// }
