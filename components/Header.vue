<template>
    <header class="w-full py-4 grid-container">
        <div class="flex items-center justify-between">
            <NuxtLink to="/">
                <img src="/images/header/logo.png" alt="" class="w-52">
            </NuxtLink>
            <div class="flex items-center text-lg gap-6 max-lg:hidden">
                <NuxtLink to="/">Главная</NuxtLink>
                <span class="w-px h-8 bg-white"></span>
                <NuxtLink to="/catalog">Каталог</NuxtLink>
                <span class="w-px h-8 bg-white"></span>
                <NuxtLink to="/stat">Статистика</NuxtLink>
                <span class="w-px h-8 bg-white"></span>
                <NuxtLink to="/cart">
                    <Icon class="text-2xl" name="ph:bag-fill"/>
                </NuxtLink>
                <span class="w-px h-8 bg-white"></span>
                <NuxtLink :to="authenticated ? '/profile' : '/auth'">
                    <Icon class="text-2xl" name="material-symbols:person"/>
                </NuxtLink>
            </div>
            <button class="lg:hidden">
                <Icon class="text-3xl" name="material-symbols:menu"/>
            </button>
        </div>
    </header>
</template>

<script setup>
    const { authenticated } = storeToRefs(useUserStore())
</script>