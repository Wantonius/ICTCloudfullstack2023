//Structs can be so-called tuple structs

#[derive(Debug)] //built-in trait allows for debugging. More on traits later
struct Color(u8,u8,u8);

//Or more usual named structs

struct SizeAndColor {
	size:u32,
	color:Color
}

fn main() {
	let my_color = Color(50,0,50);
	
	let size_and_color = SizeAndColor {
		size:150,
		color:my_color
	};
	
	println!("Size is {} and color is {:?}",size_and_color.size,size_and_color.color);
}