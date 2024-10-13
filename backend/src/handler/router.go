package handler

import (
	"net/http"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	jwt "github.com/form3tech-oss/jwt-go"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func InitRouter() http.Handler {
	jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			return []byte(mySigningKey), nil
		},
		SigningMethod: jwt.SigningMethodHS256,
	})

	router := mux.NewRouter()
	router.Handle("/recommend", http.HandlerFunc(getShippingOptionsHandler)).Methods("POST")
	router.Handle("/upload", jwtMiddleware.Handler(http.HandlerFunc(createOrderHandler))).Methods("POST")
	router.Handle("/search", http.HandlerFunc(searchOrderHandler)).Methods("GET")
	router.Handle("/orderhistory", jwtMiddleware.Handler(http.HandlerFunc(orderHistoryHandler))).Methods("GET")
	router.Handle("/checkout", http.HandlerFunc(checkoutHandler)).Methods("POST")
	// router.Handle("/track", http.HandlerFunc(trackHandler)).Methods("GET")
	router.Handle("/signup", http.HandlerFunc(signupHandler)).Methods("POST")
	router.Handle("/signin", http.HandlerFunc(signinHandler)).Methods("POST")

	originsOk := handlers.AllowedOrigins([]string{"*"})
	headersOk := handlers.AllowedHeaders([]string{"Authorization", "Content-Type"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "DELETE"})
	return handlers.CORS(originsOk, headersOk, methodsOk)(router)
}
