package main

import (
	"net/http"
	"fmt"
	"encoding/json"
	"strconv"
	"math/rand"
	"time"
)

type Item struct {
	Id		string	`json:"id"`
	Type	string	`json:"type"`
	Count	string	`json:"count"`
	Price	string 	`json:"price"`
}

type User struct {
	Username	string	`json:"username"`
	Password	string	`json:"password"`
}

type Session struct {
	TTL		int64
	Token	string
}

type MyToken struct {
	Token	string	`json:"token"`
}

type BackendMessage struct {
	Message	string	`json:"message"`
}

const time_to_live = 3600
var ShoppingItems []Item
var RegisteredUsers []User
var LoggedSessions []Session
var id int64
type Middleware func(http.HandlerFunc) http.HandlerFunc
var letters = []rune("abcderfghijklmnopqrstuABCEDFGHIJKLMNOPQRSTU")

func HandleGetAndPost(w http.ResponseWriter, r* http.Request) {
	switch r.Method {
		case http.MethodGet:
			json.NewEncoder(w).Encode(ShoppingItems)
		case http.MethodPost:
			var item Item
			json.NewDecoder(r.Body).Decode(&item)
			item.Id = strconv.FormatInt(int64(d),10)
			id++
			ShoppingItems = append(ShoppingItems,item)
			message := BackendMessage{Message:"Created"}
			w.WriteHeader(http.StatusCreated)
			json.NewEncoder(w).Encode(message)
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
			message := BackendMessage{Message:"Unknown Command"}
			json.NewEncoder(w).Encode(message)
	}
})

func HandleDeleteAndPut(w http.ResponseWriter, r* http.Request) {
	temp_string := r.URL.String()
	temp_id := temp_string[len(temp_string)-3:]
	switch r.Method {
		case http.MethodDelete:
			for i,item := range ShoppingItems {
				if(item.Id == temp_id) {
					ShoppingItems = append(ShoppingItems[:i],ShoppingItems[i+1:]...)
				}
			}
			message := BackendMessage{Message:"Success"}
			json.NewEncoder(w).Encode(message)
		case http.MethodPut:
			var t_item Item
			json.NewDecoder(r.Body).Decode(&t_item)
			for i,item := range ShoppingItems {
				if item.Id == temp_id {
					ShoppingItems[i] = t_item
				}
			}
			message := BackendMessage{Message:"Success"}
			json.NewEncoder(w).Encode(message)
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
			message := BackendMessage{Message:"Unknown Command"}
			json.NewEncoder(w).Encode(message)
	}
})

func CreateToken() string {
	rand.Seed(time.Now().UnixNano())
	b := make([]rune,128)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func Register(w http.ResponseWriter, r* http.Request) {
	switch r.Method {
		case http.MethodPost:
			var user User 
			json.NewDecoder(r.Body).Decode(&user)
			for _,temp_user := range RegisteredUsers {
				if user.Username == temp_user.Username {
					w.WriteHeader(http.StatusConflict)
					message := BackendMessage{Message:"Username already in use"}
					json.NewEncoder(w).Encode(message)
					return
				}
			}
			RegisteredUsers = append(RegisteredUsers,user)
			message := BackendMessage{Message:"Register Success"}
			json.NewEncoder(w).Encode(message)
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
			message := BackendMessage{Message:"Unknown Command"}
			json.NewEncoder(w).Encode(message)			
	}
})

func Login(w http.ResponseWriter, r* http.Request) {
	switch r.Method {
		case http.MethodPost:
			var user User
			json.NewDecoder(r.Body).Decode(&user)
			for _,u := range RegisteredUsers {
				if u.Username == user.Username {
					if u.Password == user.Password {
						now := time.Now().Unix() + time_to_live
						t := CreateToken()
						LoggedSessions = append(LoggedSessions,Session{TTL:now,Token:t})
						data := MyToken{Token:t}
						json.NewEncoder(w).Encode(data)
						return
					}
				}
			}
			w.WriteHeader(http.StatusUnauthorized)
			message := BackendMessage{Message:"Unauthorized"}
			json.NewEncoder(w).Encode(message)
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
			message := BackendMessage{Message:"Unknown Command"}
			json.NewEncoder(w).Encode(message)
	}
})