fn main() {

	//There are two types of strings in Rust. First one is &str reference which is lightweight and fast. 
	//The other is String type which has more functionality
	
	let name = "Bingo";
	let other_name = String::from("Adrian Tepes");
	
	println!("My name is {0} and this is {1}.",name,other_name);
	
	//The &str reference is dynamically sized. String is an owned type and it has a size
	
	println!("a String is always {:?} bytes. It is Sized",std::mem::size_of::<String>());
	println!("a f64 is always {:?} bytes. It is Sized",std::mem::size_of::<f64>());
	println!("But a &str? It can be anything. 'Bingo' is {:?} bytes. It is not Sized.",std::mem::size_of_val("Bingo"));

	let my_name = "Jim Bob";
	let my_country = "USA";
	let my_home = "Alabama";
	
	let together = format!(
		"I am {} and I come from {}. I live in {}.",my_name,my_country,my_home
	);
	
	println!("{}",together);
}