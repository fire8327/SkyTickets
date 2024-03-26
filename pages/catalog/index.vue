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
            <button class="px-4 py-2 rounded-xl bg-[#7DCCFF]">Применить</button>
        </div>
        <div class="w-full lg:w-3/4 flex flex-col gap-6">
            <NuxtLink :to="`/catalog/ticket-${product.id}`" class="flex flex-col gap-4 rounded-xl bg-[#1d1e20] p-4 transition-colors duration-500 hover:bg-[#242528]" v-for="product in products">
                <p class="text-2xl">Перевозчик - {{ product.carrier }}</p>
                <div class="flex items-center gap-4 md:gap-6 justify-between">
                    <div class="flex flex-col gap-1 font-normal">
                        <p class="text-3xl">{{ product.time1 }}</p>
                        <p class="opacity-70">{{ product.from }}</p> 
                        <p class="opacity-70">{{ product.date1 }}</p> 
                    </div>
                    <div class="flex flex-col gap-2 md:grow">
                        <div class="flex items-center justify-between">
                            <div class="max-md:hidden">
                                <Icon class="text-2xl text-[#7DCCFF]" name="mingcute:flight-takeoff-fill"/>
                            </div>
                            <p>В пути: {{ product.travelTime }}</p>
                            <div class="max-md:hidden">
                                <Icon class="text-2xl text-[#7DCCFF]" name="mingcute:flight-land-fill"/>
                            </div>
                        </div>
                        <div class="rounded-full w-full h-2.5 bg-[#5a5c5f]"></div>
                    </div>
                    <div class="flex flex-col gap-1 font-normal">
                        <p class="text-3xl">{{ product.time2 }}</p>
                        <p class="opacity-70">{{ product.where }}</p> 
                        <p class="opacity-70">{{ product.date2 }}</p> 
                    </div>
                </div>
                <div class="flex items-center justify-between gap-4">
                    <p class="text-3xl">{{ product.price.toLocaleString('ru') }}₽</p>
                    <button class="px-4 py-2 rounded-xl bg-[#7DCCFF]" v-if="authenticated">Купить</button>
                </div>
            </NuxtLink>
        </div>
    </div>
    <button type="button" @click="messageTitle = null" class="fixed top-10 right-10 z-[11] cursor-pointer flex items-center gap-4 px-6 py-2 rounded-2xl w-fit text-white" :class="messageType ? ' bg-[#7DCCFF]' : 'bg-red-500'" v-if="messageTitle">
        <span>{{messageTitle}}</span>
        <Icon name="material-symbols:close-rounded" class="text-xl"/>
    </button>
</template>

<script setup>
    const { authenticated } = storeToRefs(useUserStore())


    const supabase = useSupabaseClient() 
    const { data: products } = await supabase.from('products').select("*")


    const { messageTitle, messageType } = storeToRefs(useMessagesStore())
</script>