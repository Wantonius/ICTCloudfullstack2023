package main

import "fmt"

func main() {

	var b int = 15
	var a int
	var t int = 10
	numbers := [6]int{1,2,3,5}
	
	/*for loop*/
	for a := 0; a < 10; a++ {
		fmt.Printf("Value of a:%d\n",a)
	}
	
	for a < b {
		a++
		fmt.Printf("Value of a:%d\n",a)
	}
	
	//i,x for index and value. Replace index with blank if needed "for _,x"
	
	for i,x := range numbers {
		fmt.Printf("Value of x = %d at %d\n",x,i)
	}
	
	//if has no partentheses around conditions but braces are required

	if t > 5 {
		fmt.Printf("%d is bigger than 5\n",t)
	}
	
	if t < 5 {
		fmt.Printf("%d is smaller than 5\n",t)
	} else {
		fmt.Printf("%d is still bigger than 5\n",t)
	}
	
	i := 2
	fmt.Print("Write ",i," as ")
	switch i {
		case 1:
			fmt.Println("one")
		case 2:
			fmt.Println("two")
		case 3:
			fmt.Println("three")
	}

	whatAmI := func(i interface{}) {
		switch t := i.(type) {
			case bool:
				fmt.Println("I am a bool")
			case int:
				fmt.Println("I am an int")
			default:
				fmt.Printf("Don't know type %T\n",t)
		}
	}
	
	whatAmI(true)
	whatAmI(1)
	whatAmI("hey")
}	