<script>
	export let name;
	let age = 30;

	$: uppercaseName = name.toUpperCase();

	$: console.log(name);

	$: if (name.toLowerCase().startsWith('d')) {
		age = 10;
	}

	function incrementAge() {
		age = age + 1;
	}

	function changeName() {
		name = name.split('').reverse().join('');
	}

	function nameInput(event) {
		name = event.target.value;
	}
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {uppercaseName}, my age is {age}!</h1>
<button on:click={incrementAge}>Change Age</button>
<button on:click={changeName}>Change Name</button>
<input type="text" value={name} on:input={nameInput} />
<input type="text" bind:value={name} />