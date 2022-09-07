package explorer

import (
	"fmt"
	"log"
	"net/http"
	"text/template"
	"github.com/inho9377/nomadcoin-explorer/blockchain"
)
var templates *template.Template

const (
	port string = 			":4000"
	templateDir string = 	"explorer/templates/"
)

type homeData struct {
	PageTitle string // 반드시 대문자로 시작
	Blocks []*blockchain.Block
}

func home(rw http.ResponseWriter, r *http.Request) {
	data := homeData{"Home", blockchain.GetBlockchain().AllBlocks()}
	templates.ExecuteTemplate(rw, "home", data)
}

func add(rw http.ResponseWriter, r *http.Request) {
	templates.ExecuteTemplate(rw, "add", nil)
	switch r.Method {
	case "GET":
		templates.ExecuteTemplate(rw, "add", nil)
	case "POST":
		r.ParseForm()
		data := r.Form.Get("blockData")
		blockchain.GetBlockchain().AddBlock(data)
		http.Redirect(rw, r, "/", http.StatusPermanentRedirect)
	}
}

func Start() {
	templates = template.Must(template.ParseGlob(templateDir + "pages/*.gohtml")) // 표준 lib 인 template에 의한 실행
	templates = template.Must(templates.ParseGlob(templateDir + "partials/*.gohtml")) // template Object(templates variable) 에 의한 실행
	// variable 을 update (not create)
	http.HandleFunc("/", home)
	http.HandleFunc("/add", add)
	fmt.Printf("Listening on http://localhost%s\n", port)
	log.Fatal(http.ListenAndServe(port, nil))
}