fn main() {

	let my_number = 5;
	if my_number == 7 {
		println!("It's seven");
	} else if my_number == 8 {
		println!("It's eight");
	} else {
		println!("It's a different number");
	}
	
	//Instead of switch we have match
	
	let my_number:u8 = 5;
	match my_number {
		0 => println!("It's zero"),
		1 => println!("It's one"),
		2 => println!("It's two"),
		_ => println!("It's some other number"),
	}
	
	// You can return values from match;
	
	let my_number = 5;
	let second_number = match my_number {
		0 => 0,
		5 => 10,
		_ => 2,
	};
	
	println!("{}",second_number);

	let first = (200,0,0);
	let second = (50,50,50);
	let third = (200,50,0);
	
	match_colours(first);
	match_colours(second);
	match_colours(third);
}

fn match_colours(rgb:(i32,i32,i32)) {
	match rgb {
		(r,_,_) if r < 10 => println!("Not much red"),
		(_,g,_) if g < 10 => println!("Not much green"),
		(_,_,b) if b < 10 => println!("Not much blue"),
		_ => println!("Each color is atleast 10"),
	}
}