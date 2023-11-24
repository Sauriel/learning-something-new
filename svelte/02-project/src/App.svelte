<script>
  import Header from './UI/Header.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';
  import TextInput from './UI/TextInput.svelte';
  import Button from './UI/Button.svelte';

  let meetups = [
    {
      id: 'm1',
      title: 'Coding Bootcamp',
      subtitle: 'Learn to code in 2 hours',
      description: 'In this meetup, we will have some exports teach you how to code!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/First_Caffe_Nero_Sutton_Surrey_London.JPG/800px-First_Caffe_Nero_Sutton_Surrey_London.JPG',
      address: '27th Nerd Road, 32523 New York',
      contactEmail: 'code@test.com',
      isFavorite: false
    },
    {
      id: 'm2',
      title: 'Swim Together',
      subtitle: 'Let\'s go for some swimming',
      description: 'We will simply swim some rounds!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Olympic_Swimming_Pool_-_Fast_Lane.JPG',
      address: '27th Nerd Road, 32523 New York',
      contactEmail: 'seim@test.com',
      isFavorite: false
    }
  ];

  let title = '';
  let subtitle = '';
  let description = '';
  let imageUrl = '';
  let address = '';
  let email = '';

  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString(),
      title,
      subtitle,
      description,
      imageUrl,
      address,
      contactEmail: email,
      isFavorite: false
    };

    meetups = [ newMeetup, ...meetups ];
  }

  function toggleFavorite(event) {
    const id = event.detail;
    const updatedMeetup ={...meetups.find(m => m.id === id)};
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = meetups.findIndex(m => m.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;
  }
</script>

<style>
  main {
    margin-top: 5em;
  }
  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
    <TextInput
      id="title"
      label="Title"
      value={title}
      on:input={(event) => title = event.target.value}
      controlType="text"
    />
    <TextInput
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      on:input={(event) => subtitle = event.target.value}
      controlType="text"
    />
    <TextInput
      id="address"
      label="Address"
      value={address}
      on:input={(event) => address = event.target.value}
      controlType="text"
    />
    <TextInput
      id="imageUrl"
      label="Image URL"
      value={imageUrl}
      on:input={(event) => imageUrl = event.target.value}
      controlType="text"
    />
    <TextInput
      id="email"
      label="E-Mail"
      type="email"
      value={email}
      on:input={(event) => email = event.target.value}
      controlType="text"
    />
    <TextInput
      id="description"
      label="Description"
      value={description}
      on:input={(event) => description = event.target.value}
      controlType="textarea"
      rows="3"
    />
    <Button
      type="submit"
      caption="Save"
    />
  </form>
  <MeetupGrid
    {meetups}
    on:togglefavorite={toggleFavorite}
  />
</main>