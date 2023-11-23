package main

import "fmt"

func main() {

	//Arrays have a specific length in Go and will be zero-initialized unless explicitly initialized to something else
	
	var myArray [6]int
	
	fmt.Println("myArray:",myArray)
	fmt.Println("myArray length:",len(myArray))
	
	myArray[3] = 50
	
	fmt.Println("myArray after set:",myArray)
	
	myInitializedArray := [3]int{0,1,2}
	
	fmt.Println("Initialized Array:",myInitializedArray)

	//This is a slice. Slices do not have a set length only the type they contain. Slices support additional functionality when compared to arrays.
	
	var mySlice []int
	
	myAllocatedSlice := make([]int,10)
	
	fmt.Println("mySlice:",mySlice)
	fmt.Println("mySlice length:",len(mySlice))
	
	fmt.Println("myAllocatedSlice:",myAllocatedSlice)
	fmt.Println("myAllocatedSlice length:",len(myAllocatedSlice))

	//when pushing new stuff into a slice use append 
	
	mySlice = append(mySlice,0)
	
	//When appending more than one thing or other slices to slices use the '...' operator

	mySlice = append(mySlice,[]int{10,100}...)
	
	fmt.Println("mySlice:",mySlice)
	fmt.Println("mySlice length:",len(mySlice))

	copiedSlice := make([]int,len(mySlice))
	
	copy(copiedSlice,mySlice)
	
	fmt.Println("CopiedSlice:",copiedSlice)
	
	partialSlice := mySlice[1:3]
	
	fmt.Println("Partialslice:",partialSlice)

	//When creating maps use make functionality
	
	intStrMap := make(map[int]string)
	stringIntMap := make(map[string]int)

	intStrMap[1] = "One"
	intStrMap[2] = "Two"
	
	stringIntMap["One"] = 1
	stringIntMap["Two"] = 2
	
	fmt.Println("intStrMap",intStrMap)
	fmt.Println("stringIntMap",stringIntMap)
	
	//Checking if map contains a thing
	
	if val, ok := intStrMap[2];ok {
		fmt.Printf("Map contains %s\n",val)
	}
	
	if _, ok := intStrMap[3];!ok {
		fmt.Printf("Map does not contain that key or value\n")
	}
}