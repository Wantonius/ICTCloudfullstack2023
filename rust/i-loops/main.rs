fn main() {

	for number in 0..3 {
		println!("The number is {}",number);
	}

	//Equal to end

	for number in 0..=3 {
		println!("The number is {}",number);
	}
	
	//loop until break. No condition on the loop
	
	let mut counter = 0;
	
	loop {
		counter +=1;
		println!("The counter is now {}",counter);
		if counter == 5 {
			break;
		}
	}
	
	//Named loops. We break the first loop from the second inner loop. Use ' and name to name loops
	
	let mut counter = 0;
	let mut counter2 = 0;
	
	'first_loop: loop {
		counter += 1;
		println!("The counter is now {}",counter);
		if counter > 9 {
			println!("Now entering second loop");
			'second_loop:loop {
				println!("Second counter is now {}",counter2);
				counter2 += 1;
				if counter2 == 3 {
					break 'first_loop;
				}
			}
		}
	}
	println!("After second loop");

	let mut counter = 0;
	
	while counter < 5 {
		counter += 1;
		println!("The counter is now {}",counter);
	}

}