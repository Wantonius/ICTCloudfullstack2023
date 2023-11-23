package main

import (
	"fmt"
	"time"
)

func worker(ch chan string, s time.Duration) {
	time.Sleep(s*time.Millisecond)
	ch <- "worker done"
}

func main() {
	channel := make(chan string)
	channel2 := make(chan string)
	
	go worker(channel,6500)
	go worker(channel2,3500)
	
	L:
	for {
		time.Sleep(1000*time.Millisecond)
		select {
			case v := <-channel:
				fmt.Println("Worker 1 says:",v)
				break L
			case v := <-channel2:
				fmt.Println("Worker 2 says:",v)
			default:
				fmt.Println("No message yet")
		}
	}
	
	fmt.Println("---Closing channels---")
	
	jobs := make(chan int,5)
	done := make(chan bool)
	
	go func() {
		for {
			fmt.Println("Worker: waiting for jobs")
			j, more := <- jobs
			if more {
				fmt.Println("Worker: Received job",j)
			} else {
				fmt.Println("worker: Received all jobs")
				done <- true
				return;
			}
		}
	}()
	for j:=1;j <=3 ;j++ {
		fmt.Println("Main: Sending another job")
		jobs <- j
		fmt.Println("Main: Sent job",j)
		time.Sleep(1000*time.Millisecond)
	}
	close(jobs)
	fmt.Println("Main:Sent all jobs")
	<-done

	fmt.Println("--- Ranging over buffered channels ---")
	
	queue := make(chan string,3)
	queue <- "one"
	queue <- "two"
	queue <- "three"
	close(queue)
	
	fmt.Println("Main: closed the queue channel")
	//Messages in the channel WILL BE delivered

	for elem := range queue {
		fmt.Printf("Received element %s from closed channel\n",elem)
	}
}