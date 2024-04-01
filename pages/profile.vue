<template>
    <div class="grow flex flex-col gap-8 items-center justify-center">
        <div class="flex flex-col gap-6 w-full lg:w-3/4 lg:mx-auto">
            <p class="text-2xl text-[#7DCCFF]">Личные данные</p>
            <div class="flex flex-col gap-4 w-full rounded-xl bg-[#1d1e20] p-4 h-fit">
                <div class="flex items-center gap-6">
                    <img :src="user[0].image" alt="" class="w-8 h-8 rounded-full object-cover">
                    <p class="text-xl md:text-2xl">{{ user[0].name }} {{ user[0].surname }} {{ user[0].patronymic }}</p>
                </div>
                <div class="flex flex-col gap-2 text-base lg:text-lg rounded-xl bg-[#242528] p-4">
                    <div class="flex items-center justify-between gap-2">
                        <p>Логин</p>
                        <p>{{ user[0].login }}</p>
                    </div>
                    <div class="w-full h-px bg-[#7DCCFF]"></div>
                    <div class="flex items-center justify-between gap-2">
                        <p>Пароль</p>
                        <p>{{ user[0].password }}</p>
                    </div>
                    <div class="w-full h-px bg-[#7DCCFF]"></div>
                    <div class="flex items-center justify-between gap-2">
                        <p>Email</p>
                        <p>{{ user[0].email }}</p>
                    </div>            
                    <div class="w-full h-px bg-[#7DCCFF]"></div>
                    <div class="flex items-center justify-between gap-2">
                        <p>Номер телефона</p>
                        <p>{{ user[0].phone }}</p>
                    </div>
                    <div class="w-full h-px bg-[#7DCCFF]"></div>
                    <div class="flex items-center justify-between gap-2">
                        <p>Валюта</p>
                        <p>{{ user[0].currency }}</p>
                    </div>
                    <div class="w-full h-px bg-[#7DCCFF]"></div>
                    <div class="flex items-center justify-between gap-2">
                        <p>Страна/Язык</p>
                        <p>{{ data.country }}</p>
                    </div>
                    <div class="w-full h-px bg-[#7DCCFF]"></div>
                    <button @click="logout" class="w-full md:w-1/2 mx-auto px-4 py-2 bg-[#7DCCFF] rounded-xl mt-4">Выход</button>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-6 w-full lg:w-3/4 lg:mx-auto">
            <p class="text-2xl text-[#7DCCFF]">Прошлые заказы</p>
            <div class="flex flex-col gap-4 w-full">
                <div class="rounded-xl p-4 bg-[#1d1e20] flex flex-col gap-2 text-lg" v-for="order in orders">
                    <div class="flex items-center justify-between gap-2">
                        <p>Номер заказа</p>
                        <p>{{ order.id }}</p>
                    </div>
                    <div class="w-full h-px bg-[#7DCCFF]"></div>
                    <div class="flex items-center justify-between gap-2">
                        <p>Дата/Время заказа</p>
                        <p>{{ new Date(Number(order.updated_at)).toLocaleString() }}</p>
                    </div>
                    <div class="w-full h-px bg-[#7DCCFF]"></div>
                    <div class="flex items-center justify-between gap-2">
                        <p>Отправление</p>
                        <p>{{ order.products.from }} - {{ order.products.where }}</p>
                    </div>
                    <div class="w-full h-px bg-[#7DCCFF]"></div>
                    <div class="flex items-center justify-between gap-2">
                        <p>Цена (за 1 шт.)</p>
                        <p>{{ order.products.price }}</p>
                    </div>
                    <div class="w-full h-px bg-[#7DCCFF]"></div>
                    <div class="flex items-center justify-between gap-2">
                        <p>Количество билетов</p>
                        <p>{{ order.count }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const { authenticated, id } = storeToRefs(useUserStore())

    const router = useRouter()
    const logout = () => {
        authenticated.value = false
        id.value = null
        router.push("/")
    }


    const supabase = useSupabaseClient() 
    const { data: user } = await supabase.from('users').select("*").eq('id', `${id.value}`)


    const { data, error } = await useFetch(`https://ipinfo.io/json`)


    const { data: orders } = await supabase
    .from('cart')
    .select(`*, products (*)`)
    .eq('status', 'Новый')
    .eq('userId', `${id.value}`)
</script>