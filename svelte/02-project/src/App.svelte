<script>
  import Header from './UI/Header.svelte';
  import MeetupItem from './Meetups/MeetupItem.svelte';

  const meetups = [
    {
      id: 'm1',
      title: 'Coding Bootcamp',
      subtitle: 'Learn to code in 2 hours',
      description: 'In this meetup, we will have some exports teach you how to code!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/First_Caffe_Nero_Sutton_Surrey_London.JPG/320px-First_Caffe_Nero_Sutton_Surrey_London.JPG',
      address: '27th Nerd Road, 32523 New York',
      contactEmail: 'code@test.com'
    },
    {
      id: 'm2',
      title: 'Swim Together',
      subtitle: 'Let\'s go for some swimming',
      description: 'We will simply swim some rounds!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Olympic_Swimming_Pool_-_Fast_Lane.JPG',
      address: '27th Nerd Road, 32523 New York',
      contactEmail: 'seim@test.com'
    }
  ];
</script>

<style>
  #meetups {
    margin-top: 5em;
  }
</style>

<Header />

<section id="meetups">
  {#each meetups as meetup (meetup.id)}
    <MeetupItem
      title={meetup.title}
      subtitle={meetup.subtitle}
      imageUrl={meetup.imageUrl}
      description={meetup.description}
      address={meetup.address}
      email={meetup.contactEmail}
    />
  {/each}
</section>