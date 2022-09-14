package main

import (
	"encoding/json"
	"fmt"
	// "github.com/inho9377/nomadcoin-explorer/utils"
	"log"
	"net/http"
)

const port string = ":4000"

type URL string // (TextMarshaler, Stringer)

func (u URL) MarshalText() ([]byte, error) {
	url := fmt.Sprintf("http://localhost:%s%s", port, u)
	return []byte(url), nil
}

type URLDescription struct {
	URL         URL `json:"url"`
	Method      string `json:"method"`
	Description string `json:"description"`
	Payload     string `json:"payload,omitempty"`
}


func documentation(rw http.ResponseWriter, r *http.Request) {
	data := []URLDescription{
		{
			URL:         URL("/"),
			Method:      "GET",
			Description: "See Documentation",
		},
		{
			URL:         URL("/blocks"),
			Method:      "POST",
			Description: "Add a Block",
			Payload:     "data:string",
		},
	}
	// URL Description Slice

	fmt.Println(data)

	// Send JSON to user
	rw.Header().Add("Content-Type", "application/json")
	json.NewEncoder(rw).Encode(data)
}

func main() {
	fmt.Println(URLDescription{
		URL:         "/",
		Method:      "GET",
		Description: "See Documentation",
	})
	http.HandleFunc("/", documentation)
	fmt.Printf("Listening on http://localhost%s", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
