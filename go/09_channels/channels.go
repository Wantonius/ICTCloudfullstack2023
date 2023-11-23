package main

import (
	"fmt"
	"time"
)

func worker(done chan bool) {
	fmt.Println("Worker: Let's do some work!")
	time.Sleep(3*time.Second)
	fmt.Println("Worker:Done working. Sending indication through channel.")
	done <- true
}

func main() {

	messages := make(chan string)
	
	//Create a new channel with make(chan val-type). Channels are typed by values they convey.
	//By default sends and receives block until the sender and receiver are ready

	fmt.Println("--- Basic Channel ---")
	
	go func() {
		fmt.Println("Pinger: Pinging the main")
		messages <- "ping"
	}()
	
	fmt.Println("Main: Reading the channel")
	msg := <-messages
	fmt.Println(msg)
	time.Sleep(2*time.Second)
	
	//By default channels are unbuffered but you can create buffers to channels like so
	
	fmt.Println("---Buffered channel---")
	
	buffered := make(chan string,2)
	
	buffered <- "Buffered"
	buffered <- "Channel"
	
	fmt.Print(<-buffered)
	fmt.Println(<-buffered)

	done := make(chan bool,1)
	go worker(done)
	fmt.Println("Main: Waiting for worker.")
	<-done
	fmt.Println("Main:Worker done. Exiting.")
}