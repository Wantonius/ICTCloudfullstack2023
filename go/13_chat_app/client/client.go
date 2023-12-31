package main

import (
	"bufio"
	"fmt"
	"net"
	"strings"
	"os"
)

func send(conn net.Conn, done chan bool, reader bufio.Reader) {
	for {
		fmt.Print("Text to send:")
		input,_ := reader.ReadString('\n')
		conn.Write([]byte(input))
		fmt.Printf("Message sent:%s\n",input)
		if strings.TrimRight(input,"\r\n") == "quit" {
			conn.Close()
			done <- true
			return
		}
	}
}

func receive(conn net.Conn, done chan bool) {
	var stringbuffer string
	for {
		buffer, err := bufio.NewReader(conn).ReadBytes('\n')
		if err != nil {
			fmt.Println("Problem with server")
			return
		}
		stringbuffer =  string(buffer[:len(buffer)-1])
		fmt.Printf("\nServer message:%s",stringbuffer)
	}
}

func main() {
	done := make(chan bool,1)
	fmt.Println("Welcome to chat app")
	fmt.Println("Please enter your name")
	reader := bufio.NewReader(os.Stdin)
	input,_ := reader.ReadString('\n')
	conn,err := net.Dial("tcp","localhost:5000")
	if err != nil {
		fmt.Println("Error connecting:",err.Error())
		os.Exit(1)
	}
	conn.Write([]byte(input))
	go send(conn,done,*reader)
	go receive(conn,done)
	<-done
	fmt.Println("Main exiting")
}