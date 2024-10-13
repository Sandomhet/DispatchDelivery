package gateway

import (
	"src/constants"
	"fmt"

	"github.com/stripe/stripe-go/v74"
	"github.com/stripe/stripe-go/v74/checkout/session"
	"github.com/stripe/stripe-go/v74/price"
	"github.com/stripe/stripe-go/v74/product"
)

func CreateOrderWithPrice(orderID string, orderPrice int64) (productID, priceID string, err error) {
	stripe.Key = constants.STRIPE_API_KEY
	product_params := &stripe.ProductParams{
		Name: &orderID,
		// ID: &orderID,
	}
	newOrder, err := product.New(product_params)
	if err != nil {
		fmt.Println("Failed to create product:" + err.Error())
		return "", "", err
	}

	price_params := &stripe.PriceParams{
		Currency:   stripe.String(string(stripe.CurrencyUSD)),
		Product:    stripe.String(newOrder.ID),
		UnitAmount: &orderPrice,
	}
	newPrice, err := price.New(price_params)
	if err != nil {
		fmt.Println("Failed to create price:" + err.Error())
		return "", "", err
	}

	fmt.Println("Success! Here is your order id: " + newOrder.ID)
	fmt.Println("Success! Here is your price id: " + newPrice.ID)
	return newOrder.ID, newPrice.ID, nil
}

func CreateCheckoutSession(domain string, priceID string) (string, error) {
	stripe.Key = constants.STRIPE_API_KEY
	params := &stripe.CheckoutSessionParams{
		LineItems: []*stripe.CheckoutSessionLineItemParams{
			{
				Price:    &priceID,
				Quantity: stripe.Int64(1),
			},
		},
		Mode:       stripe.String(string(stripe.CheckoutSessionModePayment)),
		SuccessURL: stripe.String(domain + "?success=true"),
		CancelURL:  stripe.String(domain + "?canceled=true"),
	}

	s, err := session.New(params)
	if err != nil {
		fmt.Printf("session.New: %v", err)
		return "", err
	}
	return s.URL, err
}
