fn print_country(country_name:String) {
	println!("{}",country_name);
}

fn print_country_returns_country(country_name:String) -> String {
	println!("{}",country_name);
	country_name //Return value. No semicolon
}

fn print_country_with_reference(country_name:&String) {
	println!("{}",country_name);
}

fn add_sweden(country_name:&mut String) {
	country_name.push_str("-Ruotsi");
	println!("Now it says:{}",country_name);
}

fn main() {
	let country = String::from("Suomi");
	print_country(country);
	//print_country(country);

	//Calling a function with parameters transfers the ownership of the parameter to the called function

	let country = String::from("Suomi");
	let country = print_country_returns_country(country);
	print_country_returns_country(country);

	//We actually want a reference. This is called borrowing.
	
	let country = String::from("Suomi");
	print_country_with_reference(&country);
	print_country_with_reference(&country);

	let mut country = String::from("Suomi");
	add_sweden(&mut country);
}