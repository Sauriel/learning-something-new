<AuthCheck>
  {#if $userData?.username}
    <p class="mb-4 text-lg">
      Your username is <span class="font-bold text-accent"
        >@{$userData.username}</span
      >
    </p>
    <p class="mb-2">(Usernames cannot be changed)</p>
    <a class="btn btn-primary" href="/login/photo"> Upload Profile Image </a>
  {:else}
    <form on:submit|preventDefault={confirmUsername}>
      <input
        type="text"
        placeholder="Username"
        class="input w-full"
        class:input-error={!isValid && isTouched}
        class:input-warning={isTaken}
        class:input-success={isAvailable && isValid && !loading}
        bind:value={username}
        on:input={checkAvailability}
      />
      <div class="my-4 min-h-16 px-8 w-full">
        {#if loading}
          <p class="text-secondary">Checking availability of @{username}...</p>
        {/if}

        {#if !isValid && isTouched}
          <p class="text-error text-sm">
            must be 3-16 characters long, alphanumeric only
          </p>
        {/if}

        {#if isValid && !isAvailable && !loading}
          <p class="text-warning text-sm">
            @{username} is not available
          </p>
        {/if}

        {#if isAvailable}
          <button class="btn btn-success">Confirm username @{username} </button>
        {/if}
      </div>
    </form>
  {/if}
</AuthCheck>

<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user, userData } from "$lib/firebase";
  import { doc, getDoc, writeBatch } from "firebase/firestore";

  let username = "";
  let loading = false;
  let isAvailable = false;
  let debounceTimer: NodeJS.Timeout;

  const usernameRegEx = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  $: isValid =
    username.length > 2 && username.length < 16 && usernameRegEx.test(username);
  $: isTouched = username.length > 0;
  $: isTaken = isValid && !isAvailable && !loading;

  async function checkAvailability() {
    isAvailable = false;
    clearTimeout(debounceTimer);
    loading = true;

    debounceTimer = setTimeout(async () => {
      console.log("Checking availability for", username.toLowerCase());

      const ref = doc(db, "usernames", username.toLowerCase());
      const exists = await getDoc(ref).then((doc) => doc.exists());

      isAvailable = !exists;
      loading = false;
    }, 500);
  }

  async function confirmUsername() {
    console.log("Confirming username", username.toLowerCase());
    const batch = writeBatch(db);
    batch.set(doc(db, "usernames", username.toLowerCase()), {
      uid: $user?.uid,
    });
    batch.set(doc(db, "users", $user!.uid), {
      username: username.toLowerCase(),
      photoURL: $user?.photoURL ?? null,
      published: true,
      bio: "I am the Walrus",
      links: [
        {
          title: "Test link",
          url: "https://kung.foo",
          icon: "custom",
        },
      ],
    });

    await batch.commit();
  }
</script>
