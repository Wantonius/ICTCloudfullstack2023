fn main() {

	/* Array is data inside a square brackets: []
	- Must not change size
	- Must only contain one type
	*/
	let array1 = ["One","Two"]; //type [&str;2]
	let array2 = ["One","Two","Three"]; //type [&str;3]

	println!("Array one {:?} and array two {:?}",array1,array2);

	//Create an array of size 10 with same initialization value;
	
	let my_array = ["A";10];
	println!("{:?}",my_array);

	let array_of_ten = [1,2,3,4,5,6,7,8,9,10];
	
	//These are slices
	
	let three_to_five = &array_of_ten[2..5];
	let start_at_two = &array_of_ten[1..];
	let end_at_five = &array_of_ten[..5];
	let everything = &array_of_ten[..];
	
	println!("Three to five: {:?}, start at two; {:?}, end at five: {:?}, everything: {:?}",three_to_five,start_at_two,end_at_five,everything);
	
	//Slices work with strings
	
	let s = String::from("Hello");
	
	let len = s.len();
	
	let slice = &s[3..len];
	let slice2 = &s[1..];
	
	println!("First slice {0} and second slice {1}",slice,slice2);
	
	//Vectors are to arrays what String is to &str
	
	let name1 = String::from("Windy");
	let name2 = String::from("Gomer");
	
	let mut my_vec = Vec::new();

	//If we compile the program now it won't work. Vectors need a type.
	
	my_vec.push(name1); //Vec<String>
	my_vec.push(name2);

	println!("{:?}",my_vec);

	//Vectors can also be created with vec! macro
	
	let vec_of_ten = vec![1,2,3,4,5,6,7,8,9,10];
	//Slicing vectors
	let three_to_five = &vec_of_ten[2..5];
	
	println!("Three to five:{:?}",three_to_five);
	
	//Tuples are collections that can house multiple different items. Empty functions are tuples.
	
	let random_tuple = ("Here is a name",vec!["a"], 'b', [0,2,5],7.7);
	println!("Inside the tuple there are {:?}, {:?}, {:?}, {:?}, {:?}",random_tuple.0,random_tuple.1,random_tuple.2,random_tuple.3,random_tuple.4);
}