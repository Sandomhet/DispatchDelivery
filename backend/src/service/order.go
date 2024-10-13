package service

import (
	"fmt"
	"src/database"
	stripe "src/gateway"
	"src/model"
)

func GetOrderHistory(userName string) ([]model.Order, error) {
	// Create a query with the user name
	fmt.Println("name: ", userName)
	query := `SELECT id, shipper, from_address, from_zip_code, from_city, from_state, from_phone, from_email, consignee, to_address, to_zip_code, to_city, to_state, to_phone, to_email, total_weight, user_name, status, 
	order_time, product_id, price, price_id, deliver, duration, distance FROM orders WHERE user_name = ?`
	rows, err := database.ReadFromDB(query, userName)
	if err != nil {
		return nil, fmt.Errorf("query error: %v", err)
	}
	//defer rows.Close()

	var orders []model.Order
	for rows.Next() {
		var order model.Order
		err := rows.Scan(
			&order.Id, &order.Shipper, &order.FromAddress, &order.FromZipCode, &order.FromCity, &order.FromState,
			&order.FromPhone, &order.FromEmail, &order.Consignee, &order.ToAddress, &order.ToZipCode, &order.ToCity,
			&order.ToState, &order.ToPhone, &order.ToEmail, &order.TotalWeight, &order.UserName, &order.Status, &order.OrderTime, &order.ProductID, &order.Price, &order.PriceID, &order.Deliver, &order.Duration, &order.Distance,
		)
		if err != nil {
			return nil, fmt.Errorf("scan error: %v", err)
		}
		orders = append(orders, order)
	}

	if err := rows.Err(); err != nil {
		fmt.Printf("rows error: %v\n", err)
		return nil, fmt.Errorf("rows error: %v", err)
	}

	// If no orders were found, log this information
	if len(orders) == 0 {
		fmt.Println("No orders found for user:", userName)
	}

	return orders, nil
}

func SearchOrderByID(orderID string) (*model.Order, error) {
	query := `SELECT id, shipper, from_address, from_zip_code, from_city, from_state, from_phone, from_email, 
		consignee, to_address, to_zip_code, to_city, to_state, to_phone, to_email, total_weight, user_name, status, 
		order_time, product_id, price, price_id, deliver, duration, distance 
		FROM orders WHERE id = ?`
	rows, err := database.ReadFromDB(query, orderID)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch order: %v", err)
	}
	defer rows.Close()

	var order model.Order
	if rows.Next() {
		err := rows.Scan(
			&order.Id, &order.Shipper, &order.FromAddress, &order.FromZipCode, &order.FromCity, &order.FromState,
			&order.FromPhone, &order.FromEmail, &order.Consignee, &order.ToAddress, &order.ToZipCode, &order.ToCity,
			&order.ToState, &order.ToPhone, &order.ToEmail, &order.TotalWeight, &order.UserName, &order.Status, &order.OrderTime,
			&order.ProductID, &order.Price, &order.PriceID, &order.Deliver, &order.Duration, &order.Distance,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan order: %v", err)
		}
	} else {
		return nil, fmt.Errorf("order not found: %v", orderID)
	}

	return &order, nil
}

func CheckoutApp(domain string, orderID string) (string, error) {
	order, err := SearchOrderByID(orderID)
	if err != nil {
		return "", fmt.Errorf("failed to retrieve order: %v", err)
	}

	//2. call stripe to checkout using Price ID
	return stripe.CreateCheckoutSession(domain, order.PriceID)
}
