<script>
  import { createEventDispatcher } from 'svelte';
  import TextInput from '../UI/TextInput.svelte';
  import Button from '../UI/Button.svelte';
  import Modal from '../UI/Modal.svelte';

  let title = '';
  let subtitle = '';
  let description = '';
  let imageUrl = '';
  let address = '';
  let email = '';

  const dispatch = createEventDispatcher();

  function submitForm() {
    dispatch('save', {
      title,
      subtitle,
      description,
      imageUrl,
      address,
      email,
    });
  }

  function cancel() {
    dispatch('cancel');
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
  </form>
  <div slot="footer">
    <Button mode="outline" on:click={cancel}>Cancel</Button>
    <Button on:click={submitForm}>Save</Button>
  </div>
</Modal>