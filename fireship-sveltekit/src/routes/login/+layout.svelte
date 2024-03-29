<div class="flex justify-center my-6">
  <nav class="steps">
    <a class="step step-primary" href="/login"> Login </a>
    <a
      class="step"
      class:step-primary={$page.route.id?.match(/username|photo/g)}
      href="/login/username"
    >
      Choose Username
    </a>
    <a
      class="step"
      class:step-primary={$page.route.id?.includes("photo")}
      href="/login/photo"
    >
      Upload Photo
    </a>
  </nav>
</div>

<AnimatedRoute>
  <main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
    <div class="card-body items-center text-center">
      <slot />
    </div>
  </main>
</AnimatedRoute>

<script lang="ts">
  import { page } from "$app/stores";
  import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
</script>
