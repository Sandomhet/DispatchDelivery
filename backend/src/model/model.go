package model

type Order struct {
	Id          string  `json:"id"`
	Shipper     string  `json:"shipper"`
	FromAddress string  `json:"from_address"`
	FromZipCode string  `json:"from_zip_code"`
	FromCity    string  `json:"from_city"`
	FromState   string  `json:"from_state"`
	FromPhone   string  `json:"from_phone"`
	FromEmail   string  `json:"from_email"`
	Consignee   string  `json:"consignee"`
	ToAddress   string  `json:"to_address"`
	ToZipCode   string  `json:"to_zip_code"`
	ToCity      string  `json:"to_city"`
	ToState     string  `json:"to_state"`
	ToPhone     string  `json:"to_phone"`
	ToEmail     string  `json:"to_email"`
	TotalWeight int     `json:"total_weight"`
	UserName    string  `jason:"user_name"`
	Status      string  `json:"status"`
	OrderTime   string  `json:"order_time"`
	ProductID   string  `json:"product_id"`
	Price       float64 `json:"price"`
	PriceID     string  `json:"price_id"`
	Deliver     string  `json:"deliver"`
	Duration    string  `json:"duration"`
	Distance    float64 `json:"distance"`
}

type User struct {
	Id       int    `jason:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Base struct {
	Id          int    `json:"id"`
	BaseAddress string `json:"base_address"`
	BaseCity    string `json:"base_city"`
	BaseZipCode string `json:"base_zip_code"`
}

type Deliver struct {
	Id              int    `json:"id"`
	BaseId          int    `json:"base_id"`
	DeliverType     string `json:"deliver_type"`
	DeliverDuration int    `json:"deliver_duration"`
	DeliverStatus   string `json:"deliver_status"`
}

type CreateOrderRequest struct {
	Shipper        string `json:"shipper"`
	FromAddress    string `json:"from_address"`
	FromZipCode    string `json:"from_zip_code"`
	FromCity       string `json:"from_city"`
	FromState      string `json:"from_state"`
	FromPhone      string `json:"from_phone"`
	FromEmail      string `json:"from_email"`
	Consignee      string `json:"consignee"`
	ToAddress      string `json:"to_address"`
	ToZipCode      string `json:"to_zip_code"`
	ToCity         string `json:"to_city"`
	ToState        string `json:"to_state"`
	ToPhone        string `json:"to_phone"`
	ToEmail        string `json:"to_email"`
	TotalWeight    int    `json:"total_weight"`
	UserName       string `json:"user_name"`
	SelectedOption string `json:"selected_option"`
	OptionsID      string `json:"options_id"`
	Status         string `json:"status"`
	// Price          float64 `json:"price"`
	// OrderTime      string  `json:"order_time"`
	// ProductID      string  `json:"product_id"`
	// PriceID        string  `json:"price_id"`
	// Deliver        string  `json:"deliver"`
	// Duration       string  `json:"duration"`
	// Distance       float64 `json:"distance"`
}

type ShippingInfoRequest struct {
	FromAddress string `json:"from_address"`
	FromZipCode string `json:"from_zip_code"`
	FromCity    string `json:"from_city"`
	ToAddress   string `json:"to_address"`
	ToZipCode   string `json:"to_zip_code"`
	ToCity      string `json:"to_city"`
	TotalWeight int    `json:"total_weight"`
}
