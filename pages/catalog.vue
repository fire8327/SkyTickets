<template>
    <SearchTickets></SearchTickets>
    <div class="w-full flex items-center lg:items-start gap-6 max-lg:flex-col">
        <div class="w-full lg:w-1/4 flex flex-col gap-6 bg-[#1d1e20] p-4 rounded-xl">
            <div class="flex flex-col gap-2">
                <p class="text-xl">Цена</p>
                <div class="flex items-center gap-1">
                    <input type="text" placeholder="От" class="rounded-l-xl bg-[#2e3035] p-4 w-1/2 focus:outline-none">
                    <input type="text" placeholder="До" class="rounded-r-xl bg-[#2e3035] p-4 w-1/2 focus:outline-none">
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <p class="text-xl">Перевозчик</p>
                <select class="rounded-xl bg-[#2e3035] p-4 w-full focus:outline-none">
                    <option value="Все">Все</option>
                    <option value="Перевозчик 1">Перевозчик 1</option>
                    <option value="Перевозчик 2">Перевозчик 2</option>
                    <option value="Перевозчик 3">Перевозчик 3</option>
                    <option value="Перевозчик 4">Перевозчик 4</option>
                    <option value="Перевозчик 5">Перевозчик 5</option>
                </select>
            </div>
        </div>
        <div class="w-full lg:w-3/4 flex flex-col gap-6">
            <div class="flex flex-col gap-4 rounded-xl bg-[#1d1e20] p-4" v-for="n in 3">
                <p class="text-2xl">Перевозчик - Победа</p>
                <div class="flex items-center gap-4 md:gap-6 justify-between">
                    <div class="flex flex-col gap-1 font-normal">
                        <p class="text-3xl">17:55</p>
                        <p class="opacity-70">Город</p> 
                        <p class="opacity-70">27 марта</p> 
                    </div>
                    <div class="flex flex-col gap-2 md:grow">
                        <div class="flex items-center justify-between">
                            <div class="max-md:hidden">
                                <Icon class="text-2xl text-[#7DCCFF]" name="mingcute:flight-takeoff-fill"/>
                            </div>
                            <p>В пути: 2ч</p>
                            <div class="max-md:hidden">
                                <Icon class="text-2xl text-[#7DCCFF]" name="mingcute:flight-land-fill"/>
                            </div>
                        </div>
                        <div class="rounded-full w-full h-2.5 bg-[#5a5c5f]"></div>
                    </div>
                    <div class="flex flex-col gap-1 font-normal">
                        <p class="text-3xl">19:55</p>
                        <p class="opacity-70">Город</p> 
                        <p class="opacity-70">27 марта</p> 
                    </div>
                </div>
                <div class="flex items-center justify-between gap-4">
                    <p class="text-3xl">3 474₽</p>
                    <button class="px-4 py-2 rounded-xl bg-[#7DCCFF]">Купить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>