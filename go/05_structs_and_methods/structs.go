package main

import "fmt"

//structs are created as follows

type dog struct {
	name,breed string
}

type cat struct {
	name,breed string
}

//interfaces are implemented by strucs by implementing the functions

type animal interface {
	move()
	speak()
}

//The (d dog) is called receiver type and it ties the function, function becoming a method, to the type dog struct

func (d dog) move() {
	fmt.Printf("%s runs. See %s run!\n",d.name,d.name)
}

func (d dog) speak() {
	fmt.Printf("%s barks. %s is a %s.\n",d.name,d.name,d.breed)
}

func (c cat) move() {
	fmt.Printf("%s sneaks.\n",c.name)
}

func (c cat) speak() {
	fmt.Printf("%s meows. %s is a %s\n",c.name,c.name,c.breed)
}

func act(a animal) {
	a.move()
	a.speak()
}

func main() {
	duke := dog{name:"Duke",breed:"sitter"}
	whiskers := cat{name:"Whiskers",breed:"persian"}

	fmt.Println("Accessing functions directly through type")
	duke.move()
	duke.speak()
	whiskers.move()
	whiskers.speak()
	
	fmt.Println("Accessing same functionality through implemented interface")
	act(duke)
	act(whiskers)
}