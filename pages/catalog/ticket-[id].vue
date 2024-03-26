<template>
    <div class="flex flex-col gap-6 lg:w-1/2 rounded-xl bg-[#1d1e20] p-4 lg:mx-auto">
        <NuxtLink to="/catalog" class="flex items-center gap-4 rounded-full bg-[#7DCCFF] py-2 px-4 w-fit">
            <Icon name="ri:arrow-go-back-fill"/>
            <span>Назад</span>
        </NuxtLink>
        <div class="flex flex-col gap-2">
            <p class="text-xl md:text-2xl">{{ product[0].from }} - {{ product[0].where }}</p>
            <p class="text-lg md:text-xl opacity-70">В пути: {{ product[0].travelTime }}</p>
        </div>
        <img src="/images/catalog/ticket.png" alt="" class="w-fit mx-auto">
        <div class="flex flex-col gap-2 text-base lg:text-lg rounded-xl bg-[#242528] p-4">
            <div class="flex items-center justify-between gap-2">
                <p>Время вылета</p>
                <p>{{ product[0].time1 }}</p>
            </div>
            <div class="w-full h-px bg-[#7DCCFF]"></div>
            <div class="flex items-center justify-between gap-2">
                <p>Дата вылета</p>
                <p>{{ product[0].date1 }}</p>
            </div>
            <div class="w-full h-px bg-[#7DCCFF]"></div>
            <div class="flex items-center justify-between gap-2">
                <p>Время прилёта</p>
                <p>{{ product[0].time2 }}</p>
            </div>            
            <div class="w-full h-px bg-[#7DCCFF]"></div>
            <div class="flex items-center justify-between gap-2">
                <p>Дата прилёта</p>
                <p>{{ product[0].date2 }}</p>
            </div>
            <div class="w-full h-px bg-[#7DCCFF]"></div>
            <div class="flex items-center justify-between gap-2">
                <p>Перевозчик</p>
                <p>{{ product[0].carrier }}</p>
            </div>
            <div class="w-full h-px bg-[#7DCCFF]"></div>
            <div class="flex items-center justify-between gap-2">
                <p>Тип билета</p>
                <p>{{ product[0].type }}</p>
            </div>
            <div class="w-full h-px bg-[#7DCCFF]"></div>
            <div class="flex items-center gap-2 md:justify-between mt-4 max-md:flex-col">
                <p class="text-3xl">{{ product[0].price.toLocaleString('ru') }}₽</p>
                <button class="w-full md:w-1/2 lg:w-1/3 px-4 py-2 bg-[#7DCCFF] rounded-xl" v-if="authenticated">Купить</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    const { authenticated } = storeToRefs(useUserStore())


    const route = useRoute()
    const supabase = useSupabaseClient() 
    const { data: product } = await supabase.from('products').select("*").eq('id', `${route.params.id}`)
</script>