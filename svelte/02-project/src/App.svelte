<script>
  import meetupStore from './Meetups/meetups-store';
  import Header from './UI/Header.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';
  import EditMeetup from './Meetups/EditMeetup.svelte';
  import MeetupDetail from './Meetups/MeetupDetail.svelte';
  import LoadingSpinner from './UI/LoadingSpinner.svelte';
  import Error from './UI/Error.svelte';

  let editMode = null;
  let editedId;
  let page = 'overview';
  let pageData = {};
  let isLoading = true;
  let error;

  fetch('https://svelte-course-45a1e-default-rtdb.europe-west1.firebasedatabase.app/meetups.json')
  .then(res => {
    if (!res.ok) {
      throw new Error('Fetching meetups failes, please try again later!');
    }
    return res.json();
  })
  .then(data => {
    const loadedMeetups = Object.entries(data).map(([key, value]) => ({...value, id: key})).reverse();
    setTimeout(() => { // Fake slow connection to test loading
      meetupStore.setMeetups(loadedMeetups);
      isLoading = false;
    }, 1000);
  })
  .catch(err => {
    error = err;
    console.error(err);
    isLoading = false;
  });

  function savedMeetup() {
    editMode = null;
    editedId = null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null;
  }

  function showDetails(event) {
    page = 'details';
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = 'overview';
    pageData = {};
  }

  function startEdit(event) {
    editMode = 'edit';
    editedId = event.detail;
  }

  function clearError() {
    error = null;
  }
</script>

<style>
  main {
    margin-top: 5em;
  }
</style>

{#if error}
  <Error message={error} on:cancel={clearError} />
{/if}

<Header />

<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup
        id={editedId}
        on:save={savedMeetup}
        on:cancel={cancelEdit}
      />
    {/if}
    {#if isLoading}
      <LoadingSpinner />
    {:else}
      <MeetupGrid
        meetups={$meetupStore}
        on:showdetails={showDetails}
        on:edit={startEdit}
        on:add={() => editMode = 'edit'}
      />
    {/if}
  {:else}
    <MeetupDetail
      id={pageData.id}
      on:close={closeDetails}
    />
  {/if}
</main>