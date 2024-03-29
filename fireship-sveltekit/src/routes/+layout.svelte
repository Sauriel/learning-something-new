<div class="min-h-screen flex flex-col">
  <slot />
</div>

<script lang="ts">
  import { user, userData } from "$lib/firebase";
  import "../app.css";

  $user;
  $userData;
</script>
