import { Schema, model } from "mongoose";


const userSchema = Schema({
	name: String,
	email: String,
	passwd: String,
	bal: {
		type: Number,
		default: 0.00,
	},
	hist: Array,
});

userSchema.methods.sayHello = function() {
	console.log(`Hello ${this.name}`);
};

const User = new model('User', userSchema);


export default User;



