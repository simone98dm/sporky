<template>
  <div class="ambient-glow relative flex min-h-screen flex-col bg-background">
    <header
      class="relative z-10 mx-auto flex w-full max-w-3xl items-center justify-between px-gutter py-6 md:px-container-padding"
    >
      <NuxtLink to="/" class="flex items-center gap-3 text-primary">
        <span class="material-symbols-outlined fill" aria-hidden="true"
          >graphic_eq</span
        >
        <span class="text-headline-md">Sporky</span>
      </NuxtLink>
    </header>
    <main
      class="legal-prose relative z-10 mx-auto w-full max-w-3xl flex-1 px-gutter pb-section-margin md:px-container-padding"
    >
      <slot />
    </main>
    <AppFooter class="relative z-10" />
  </div>
</template>
