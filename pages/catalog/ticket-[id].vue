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
                <button @click="addCart(product[0].id)" class="w-full md:w-1/2 lg:w-1/3 px-4 py-2 bg-[#7DCCFF] rounded-xl" v-if="authenticated">Купить</button>
            </div>
        </div>
        <button type="button" @click="messageTitle = null" class="fixed top-10 right-10 z-[11] cursor-pointer flex items-center gap-4 px-6 py-2 rounded-2xl w-fit text-white" :class="messageType ? ' bg-[#7DCCFF]' : 'bg-red-500'" v-if="messageTitle">
            <span>{{messageTitle}}</span>
            <Icon name="material-symbols:close-rounded" class="text-xl"/>
        </button>
    </div>
</template>

<script setup>
    const { messageTitle, messageType } = storeToRefs(useMessagesStore())


    const { authenticated, id } = storeToRefs(useUserStore())


    const route = useRoute()
    const supabase = useSupabaseClient() 
    const { data: product } = await supabase.from('products').select("*").eq('id', `${route.params.id}`)


    /* addCart */
    const addCart  = async (productId) => {
        const { data: carts, error } = await supabase
        .from('cart')
        .select(`*, products (*)`)
        .eq('status', 'В корзине')
        .eq('userId', `${id.value}`)
        .eq('productId', `${productId}`)

        console.log(carts)

        if(carts.length>0) {
            const { data, error } = await supabase
            .from('cart')
            .update({ count: `${Number(carts[0].count)+1}` })
            .eq('status', 'В корзине')
            .eq('userId', `${id.value}`)
            .eq('productId', `${productId}`)
            .select()      
        
            messageTitle.value = 'Количество товара обновлено!', messageType.value = true
            setTimeout(() => {
                messageTitle.value = null
            }, 3000)
        } else {            
            const { data, error } = await supabase
            .from('cart')
            .insert([
                { userId: `${id.value}`, productId: `${productId}`, status: 'В корзине', count: '1' },
            ])
            .select()          
            
            messageTitle.value = 'Товар добавлен в корзину!', messageType.value = true
            setTimeout(() => {
                messageTitle.value = null
            }, 3000)
        }
    }
</script>