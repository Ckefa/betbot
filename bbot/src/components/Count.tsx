import { effect } from "@preact/signals";
import { useEffect, useState } from "react";

const Count = ({ count, user }) => {
	const [val, setVal] = useState(count.value);

	console.log("Count Rendering...", count.value);


	useEffect(() => {
		effect(() => {
			console.log(count.value);
			console.log(count.value.name);
			const { name, bal } = count.value;

			console.log("Spooky action");
			setVal(name);
		});
	}, []);


	const addVal = async () => {
		console.log("Clicking ...................");
		count.value = { ...count.value, name: count.value.name + "a" };

	};

	return <div>
		<span>	{val?.name}</span>
		<button onClick={addVal}> add </button>
	</div>
};

export default Count;

