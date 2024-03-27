<template>
    <div class="flex flex-col gap-6 w-full lg:w-3/4 lg:mx-auto" v-if="carts.length">
        <p class="text-2xl text-[#7DCCFF]">Корзина</p>
        <NuxtLink :to="`/catalog/ticket-${cart.products.id}`" class="flex flex-col gap-4 rounded-xl bg-[#1d1e20] p-4 transition-colors duration-500 hover:bg-[#242528]" v-for="cart in carts">
            <p class="text-2xl">Перевозчик - {{ cart.products.carrier }}</p>
            <div class="flex items-center gap-4 md:gap-6 justify-between">
                <div class="flex flex-col gap-1 font-normal">
                    <p class="text-3xl">{{ cart.products.time1 }}</p>
                    <p class="opacity-70">{{ cart.products.from }}</p> 
                    <p class="opacity-70">{{ cart.products.date1 }}</p> 
                </div>
                <div class="flex flex-col gap-2 md:grow">
                    <div class="flex items-center justify-between">
                        <div class="max-md:hidden">
                            <Icon class="text-2xl text-[#7DCCFF]" name="mingcute:flight-takeoff-fill"/>
                        </div>
                        <p>В пути: {{ cart.products.travelTime }}</p>
                        <div class="max-md:hidden">
                            <Icon class="text-2xl text-[#7DCCFF]" name="mingcute:flight-land-fill"/>
                        </div>
                    </div>
                    <div class="rounded-full w-full h-2.5 bg-[#5a5c5f]"></div>
                </div>
                <div class="flex flex-col gap-1 font-normal">
                    <p class="text-3xl">{{ cart.products.time2 }}</p>
                    <p class="opacity-70">{{ cart.products.where }}</p> 
                    <p class="opacity-70">{{ cart.products.date2 }}</p> 
                </div>
            </div>
            <div class="flex items-center justify-between gap-4">
                <p class="text-lg">Количество в корзине: {{ cart.count }}</p>
                <p class="text-3xl">{{ cart.products.price.toLocaleString('ru') }}₽</p>
            </div>
        </NuxtLink>
        <button @click="order" class="bg-[#7DCCFF] py-2 px-4 rounded-xl mx-auto">Оформить заказ</button>
    </div>
    <div class="w-full lg:w-3/4 lg:mx-auto rounded-xl bg-[#1d1e20] p-4 flex flex-col gap-4 items-center justify-center relative h-fit" v-else>
        <p class="text-xl">Корзина пуста...</p>
        <p class="text-lg opacity-70">Перейдите в каталог для добавления товаров</p>
        <NuxtLink to="/catalog" class="px-4 py-2 rounded-xl bg-[#7DCCFF]">В каталог</NuxtLink>
    </div>
</template>

<script setup>
    const router = useRouter()

    const { id } = storeToRefs(useUserStore())
    const { messageTitle, messageType } = storeToRefs(useMessagesStore())

    const supabase = useSupabaseClient() 
    const { data: carts, error } = await supabase
    .from('cart')
    .select(`*, products (*)`)
    .eq('status', 'В корзине')
    .eq('userId', `${id.value}`)

    const order = async () => {        
        const { data, error } = await supabase
        .from('cart')
        .update({ status: 'Новый' })
        .eq('userId', `${id.value}`)
        .select()      
        
        messageTitle.value = 'Заказ оформлен!', messageType.value = true

        router.push("/")
    }
</script>