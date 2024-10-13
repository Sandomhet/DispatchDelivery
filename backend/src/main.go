package main

import (
	"fmt"
	"log"
	"src/constants"
	"src/database"
	"src/handler"

	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	fmt.Println("started-service")
	database.InitMysql()
	constants.ProxySet()
	log.Fatal(http.ListenAndServe(":8080", handler.InitRouter()))
}
