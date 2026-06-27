<template>
  <div class="ambient-glow relative flex min-h-screen bg-background">
    <AppSidebar />
    <AppTopNav />
    <main
      class="relative z-10 flex-1 px-gutter pb-32 pt-24 md:ml-[280px] md:px-container-padding"
    >
      <slot />
    </main>
  </div>
</template>
