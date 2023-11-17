<script>
	import ContactCard from './ContactCard.svelte';

	export let name;
	let age = 37;
	let userImage = 'https://avatars.githubusercontent.com/u/1913320?s=48&v=4';
	let jobTitle = 'Senior Developer';
	let description = '<strong>Lorem ipsum</strong> set dolor et unam per dolores.';

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

<h1>I'm {uppercaseName}, my age is {age}!</h1>

<button on:click={incrementAge}>Change Age</button>
<button on:click={changeName}>Change Name</button>

<!-- <input type="text" value={name} on:input={nameInput} /> -->

<input type="text" bind:value={name} />
<input type="text" bind:value={jobTitle} />
<input type="text" bind:value={userImage} />
<textarea rows="3" bind:value={description} />

<ContactCard
	userName={name}
	{jobTitle}
	{userImage}
	{description}
/>