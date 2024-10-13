package service

import (
	"fmt"
	"log"
	"src/constants"
	"src/database"
	"src/gateway"
	"src/model"

	"github.com/google/uuid"
)

type Option struct {
	// OptionID       string  `json:"option_id"`
	OptionId       int     `json:"option_id"`
	BaseId         int     `json:"base_id"`
	Name           string  `json:"name"`
	Transportation string  `json:"transportation"`
	Distance       float64 `json:"distance"`
	Duration       int     `json:"duration"`
	Price          float64 `json:"price"`
}

// type OptionsStore struct {
// 	Options   []Option
// 	Timestamp time.Time
// }

// var OptionsCache = make(map[string]OptionsStore)

func GetDispatchingOptions(from, to string) ([]Option, string, error) {
	var options []Option
	// Prepare SQL query
	query := "SELECT id, base_address, base_city, base_zip_code FROM bases"
	results, err := database.ReadFromDB(query)
	if err != nil {
		log.Fatal(err)
	}
	// Iterate over all the results
	var bases []model.Base
	for results.Next() {
		var base model.Base
		if err := results.Scan(&base.Id, &base.BaseAddress, &base.BaseCity, &base.BaseZipCode); err != nil {
			log.Fatal(err)
		}
		bases = append(bases, base)
	}

	// Recommended: robot route
	recommendedOption := Option{
		// OptionID:       uuid.New().String(),
		OptionId:       0,
		Name:           "Recommended",
		Transportation: "robot",
		Distance:       1e9,
	}
	for _, base := range bases {
		distance1, duration1, err := gateway.GetRobotRoute(base.BaseAddress, from)
		if err != nil {
			return nil, "", fmt.Errorf("failed to get robot route: %v", err)
		}
		distance2, _, err := gateway.GetRobotRoute(to, base.BaseAddress)
		if err != nil {
			return nil, "", fmt.Errorf("failed to get robot route: %v", err)
		}
		totalDistance := distance1 + distance2
		if totalDistance < recommendedOption.Distance {
			recommendedOption.BaseId = base.Id
			recommendedOption.Distance = totalDistance
			recommendedOption.Duration = duration1
		}
	}
	distance1, duration1, err := gateway.GetRobotRoute(from, to)
	if err != nil {
		return nil, "", fmt.Errorf("failed to get robot route: %v", err)
	}
	recommendedOption.Distance += distance1
	recommendedOption.Duration += duration1
	recommendedOption.Price = recommendedOption.Distance * constants.ROBOT_CHARGE
	options = append(options, recommendedOption)

	// Fastest: drone route
	fastestOption := Option{
		// OptionID:       uuid.New().String(),
		OptionId:       1,
		Name:           "Fastest",
		Transportation: "drone",
		Distance:       1e9,
	}
	for _, base := range bases {
		distance1, duration1, err := gateway.GetDroneRoute(base.BaseAddress, from)
		if err != nil {
			return nil, "", fmt.Errorf("failed to get drone route: %v", err)
		}
		distance2, _, err := gateway.GetDroneRoute(to, base.BaseAddress)
		if err != nil {
			return nil, "", fmt.Errorf("failed to get drone route: %v", err)
		}
		totalDistance := distance1 + distance2
		if totalDistance < fastestOption.Distance {
			fastestOption.BaseId = base.Id
			fastestOption.Distance = totalDistance
			fastestOption.Duration = duration1
		}
	}
	distance1, duration1, err = gateway.GetDroneRoute(from, to)
	if err != nil {
		return nil, "", fmt.Errorf("failed to get drone route: %v", err)
	}
	fastestOption.Distance += distance1
	fastestOption.Duration += duration1
	fastestOption.Price = fastestOption.Distance * constants.DRONE_CHARGE
	options = append(options, fastestOption)

	// Cheapest: robot route but shared with others
	cheapestOption := Option{
		// OptionID:       uuid.New().String(),
		OptionId:       2,
		Name:           "Cheapest",
		BaseId:         recommendedOption.BaseId,
		Transportation: "robot",
		Distance:       recommendedOption.Distance * 2,
		Duration:       recommendedOption.Duration * 6 / 5,
		Price:          recommendedOption.Distance * constants.ROBOT_CHARGE * 2 / 3,
	}
	options = append(options, cheapestOption)

	// Store options in cache with a unique identifier
	optionsID := uuid.New().String()
	// OptionsCache[optionsID] = OptionsStore{
	// 	Options:   options,
	// 	Timestamp: time.Now(),
	// }

	return options, optionsID, nil
}

// func GetDispatchingOptions(from, to string) ([]Option, string, error) {
// 	var options []Option
// 	// Prepare SQL query
// 	query := "SELECT id, base_address, base_city, base_zip_code FROM bases"
// 	results, err := database.ReadFromDB(query)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	// Iterate over all the results
// 	var bases []model.Base
// 	for results.Next() {
// 		var base model.Base
// 		if err := results.Scan(&base.Id, &base.BaseAddress, &base.BaseCity, &base.BaseZipCode); err != nil {
// 			log.Fatal(err)
// 		}
// 		bases = append(bases, base)
// 	}

// 	options[0].Transportation = "robot"
// 	options[0].Distance = 1e9
// 	for index, base := range bases {
// 		distance1, duration1 := gateway.GetRobotRoute(base.BaseAddress, from)
// 		distance2, _ := gateway.GetRobotRoute(to, base.BaseAddress)
// 		if distance1+distance2 < options[0].Distance {
// 			options[0].BaseId = index
// 			options[0].Distance = distance1 + distance2
// 			options[0].Duration = duration1
// 			options[0].Duration = duration1
// 		}
// 	}
// 	distance1, duration1 := gateway.GetRobotRoute(from, to)
// 	options[0].Distance += distance1
// 	options[0].Duration += duration1

// 	// Fastest: drone route
// 	options[1].Transportation = "drone"
// 	options[1].Distance = 1e9
// 	for index, base := range bases {
// 		distance1, duration1 := gateway.GetDroneRoute(base.BaseAddress, from)
// 		distance2, _ := gateway.GetDroneRoute(to, base.BaseAddress)
// 		if distance1+distance2 < options[1].Distance {
// 			options[1].BaseId = index
// 			options[1].Distance = distance1 + distance2
// 			options[1].Duration = duration1
// 			options[1].Duration = duration1
// 		}
// 	}
// 	distance1, duration1 = gateway.GetDroneRoute(from, to)
// 	options[1].Distance += distance1
// 	options[1].Duration += duration1

// 	// Cheapest: robot route but share with others
// 	options[2].BaseId = options[0].BaseId
// 	options[2].Transportation = "robot"
// 	options[2].Distance = options[0].Distance * 2
// 	options[2].Duration = options[0].Duration + 20*60

// 	// return recommended options
// 	options[0].Price = options[0].Distance * constants.ROBOT_CHARGE
// 	options[1].Price = options[1].Distance * constants.DRONE_CHARGE
// 	options[2].Price = options[2].Distance * constants.ROBOT_CHARGE / 3

// 	fmt.Println(options)
// 	return options, nil
// }
