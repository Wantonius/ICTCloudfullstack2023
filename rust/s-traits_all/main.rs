use std::fmt::Debug;

struct Monster {
	health:i32,
}

#[derive(Debug)]
struct Wizard {
	health:i32,
}

#[derive(Debug)]
struct Ranger {
	health:i32,
}

trait Magic {} //No implementations for these traits. They are used as trait bounds on functions
trait FightClose {}
trait FightFromDistance {}

impl FightClose for Ranger {}
impl FightClose for Wizard {}
impl FightFromDistance for Ranger {}
impl Magic for Wizard {}

fn attack_with_bow<T:FightFromDistance + Debug>(character:&T, opponent: &mut Monster, distance:u32) {
	if distance < 10 {
		opponent.health -= 10;
		println!("You attack your opponent with a bow. Opponent now has {} health left. You are now at {:?}",opponent.health,character);
	}
}

fn attack_with_sword<T:FightClose + Debug>(character:&T, opponent: &mut Monster) {
	opponent.health -= 10;
	println!("You attack your opponent with a sword. Your opponent now has {} health left. You are at: {:?}",opponent.health,character);
}

fn fireball<T:Magic + Debug>(character:&T, opponent:&mut Monster,distance:u32) {
	if distance < 15 {
		opponent.health -= 10;
		println!("You blast your opponent with a fireball. Opponent now has {} health left. You are now at {:?}",opponent.health,character);		
	}
}

fn main() {
	let radagast = Wizard {health:70};
	let aragorn = Ranger {health:80};
	
	let mut uruk_hai = Monster {health:40};
	
	attack_with_bow(&aragorn, &mut uruk_hai,8);
	fireball(&radagast, &mut uruk_hai,8);
	attack_with_sword(&aragorn, &mut uruk_hai);
	attack_with_sword(&radagast, &mut uruk_hai);
}