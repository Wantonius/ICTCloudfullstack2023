package main

import "fmt"


func willExecuteLast(greet string) {
	fmt.Printf("Goodbye %s. I was deferred to be last in the call chain\n",greet)
}

func callAdditionalDefer(greet string) {
	defer willExecuteLast(greet)
	fmt.Println("I will be before the first goodbye")
}

func helloGreeting(greet string) {
	fmt.Printf("Hello %s. I will execute first\n",greet)
}

func panics() {
	panic("Calamity ensues")
}

func main() {

	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("It panicked but we recovered. Error:%s\n",r)
		}
	}()
	
	defer panics()
	
	defer fmt.Println("Next we panic and recover!")
	
	defer willExecuteLast("John")
	defer callAdditionalDefer("Johnny")
	
	fmt.Println("First we test defer")
	helloGreeting("John")
}