struct Animal { //Simple struct - Animal has only a name
	name:String,
}

trait Dog { //The dog trait gives some functionality
	fn bark(&self) {
		println!("Woof Woof");
	}
	
	fn run(&self) {
		println!("The dog is running");
	}
}

impl Dog for Animal {} //Animal implements trait Dog with default handling.

fn main() {
	let rover = Animal {
		name:"Rover".to_string(),
	};
	
	rover.bark();
	rover.run();
}