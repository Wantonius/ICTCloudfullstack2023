fn main() {
	let x = 5;
	println!("The value of x is:{x}");
	//x = 6;
	println!("The value of x is:{x}");

	let mut y = 5;
	println!("The value of y is:{y}");
	y = 6;
	println!("The value of y is:{y}");

	let z = 5;
	let z = z + 1;
	{
		let z = z * 2;
		println!("Value of z in inner scope {z}");
	}
	println!("Value of z in outer scope {z}");
}