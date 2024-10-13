package service

import (
	"database/sql"
	"fmt"

	mysql "src/database"
	"src/model"
)

func CheckUser(username, password string) (bool, error) {
	var dbPassword string
	query := "SELECT password FROM users WHERE username = ?"
	err := mysql.Dbsql.QueryRow(query, username).Scan(&dbPassword)
	if err != nil {
		if err == sql.ErrNoRows {
			return false, nil
		}
		return false, err
	}

	if dbPassword == password {
		fmt.Printf("Login as %s\n", username)
		return true, nil
	}
	return false, nil
}

func AddUser(user *model.User) (bool, error) {
	var exists bool
	query := "SELECT EXISTS(Select 1 FROM users WHERE username = ?)"
	err := mysql.Dbsql.QueryRow(query, user.Username).Scan(&exists)
	if err != nil {
		return false, err
	}
	if exists {
		fmt.Printf("User already exists.\n")
		return false, nil
	}

	insertQuery := "INSERT INTO users (username, password) VALUES (?,?)"
	_, err = mysql.Dbsql.Exec(insertQuery, user.Username, user.Password)
	if err != nil {
		return false, err
	}

	fmt.Printf("User is added: %s ", user.Username)
	return true, nil
}
