<script>
  import meetupStore from './meetups-store';
  import { createEventDispatcher } from 'svelte';
  import TextInput from '../UI/TextInput.svelte';
  import Button from '../UI/Button.svelte';
  import Modal from '../UI/Modal.svelte';
  import { isEmpty, isValidEmail } from '../helpers/validation';

  export let id = null;

  let title = '';
  let subtitle = '';
  let description = '';
  let imageUrl = '';
  let address = '';
  let email = '';

  if (id) {
    const unsubscribe = meetupStore.subscribe(items => {
      const selectedMeetup = items.find(item => item.id === id);
      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      description = selectedMeetup.description;
      imageUrl = selectedMeetup.imageUrl;
      address = selectedMeetup.address;
      email = selectedMeetup.contactEmail;
    });
    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: addressValid = !isEmpty(address);
  $: emailValid = isValidEmail(email);
  $: formIsValid = titleValid && subtitleValid && descriptionValid && imageUrlValid && addressValid && emailValid;

  function submitForm() {
    const meetupData = {
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      address: address,
      contactEmail: email
    };

    if (id) {
      meetupStore.updateMeetup(id, meetupData);
    } else {
      meetupStore.addMeetup(meetupData);
    }
    dispatch('save');
  }

  function cancel() {
    dispatch('cancel');
  }

  function deleteMeetup() {
    meetupStore.removeMeetup(id);
    dispatch('save');
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:cancel>
  <form>
    <TextInput
      id="title"
      label="Title"
      value={title}
      on:input={(event) => title = event.target.value}
      controlType="text"
      valid={titleValid}
      validityMessage="Please enter a valid title."
    />
    <TextInput
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      on:input={(event) => subtitle = event.target.value}
      controlType="text"
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle."
    />
    <TextInput
      id="address"
      label="Address"
      value={address}
      on:input={(event) => address = event.target.value}
      controlType="text"
      valid={address}
      validityMessage="Please enter a valid address."
    />
    <TextInput
      id="imageUrl"
      label="Image URL"
      value={imageUrl}
      on:input={(event) => imageUrl = event.target.value}
      controlType="text"
      valid={imageUrlValid}
      validityMessage="Please enter a valid image url."
    />
    <TextInput
      id="email"
      label="E-Mail"
      type="email"
      value={email}
      on:input={(event) => email = event.target.value}
      controlType="text"
      valid={emailValid}
      validityMessage="Please enter a valid email address."
    />
    <TextInput
      id="description"
      label="Description"
      bind:value={description}
      controlType="textarea"
      rows="3"
      valid={descriptionValid}
      validityMessage="Please enter a valid description."
    />
  </form>
  <div slot="footer">
    <Button mode="outline" on:click={cancel}>Cancel</Button>
    <Button on:click={submitForm} disabled={!formIsValid}>Save</Button>
    {#if id}
      <Button on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>