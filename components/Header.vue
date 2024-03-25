<template>
    <header class="w-full py-4 grid-container">
        <div class="flex items-center justify-between">
            <img src="/images/header/logo.png" alt="" class="w-52">
            <div class="flex items-center text-lg gap-6">
                <NuxtLink to="/">Главная</NuxtLink>
                <span class="w-px h-8 bg-white"></span>
                <NuxtLink to="/">Каталог</NuxtLink>
                <span class="w-px h-8 bg-white"></span>
                <Icon class="text-2xl" name="ph:bag-fill"/>
                <span class="w-px h-8 bg-white"></span>
                <Icon class="text-2xl" name="material-symbols:person"/>
            </div>
        </div>
    </header>
</template>

<script setup>

</script>