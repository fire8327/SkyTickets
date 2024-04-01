<template>
    <div class="grow flex items-center justify-center">
        <div class="flex flex-col gap-6 w-full lg:w-3/4 lg:mx-auto">
            <p class="text-2xl text-[#7DCCFF]">Статистика сайта</p>
            <div class="flex flex-col gap-2 text-base lg:text-lg rounded-xl bg-[#242528] p-4">
                <div class="flex items-center justify-between gap-2">
                    <p>Количество проданной продукции</p>
                    <p>{{ count }}</p>
                </div>
                <div class="w-full h-px bg-[#7DCCFF]"></div>
                <div class="flex items-center justify-between gap-2">
                    <p>Общий чек</p>
                    <p>{{ sumSales.toLocaleString('ru') }}₽</p>
                </div>
                <div class="w-full h-px bg-[#7DCCFF]"></div>
                <div class="flex items-center justify-between gap-2">
                    <p>Средний чек</p>
                    <p>{{ averageSales.toLocaleString('ru') }}₽</p>
                </div>            
                <div class="w-full h-px bg-[#7DCCFF]"></div>
                <div class="flex items-center justify-between gap-2">
                    <p>Количество посещений</p>
                    <p>{{ views }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const supabase = useSupabaseClient() 
    const { data: stats, error } = await supabase
    .from('cart')
    .select(`*, products (*)`)
    .eq('status', 'Новый')
    
    const count = ref(0)
    const sumSales = ref(0)
    const averageSales = ref(0)

    stats.forEach(el => {
        count.value += Number(el.count)
        sumSales.value += Number(el.count)*Number(el.products.price)
    })
    averageSales.value += +(sumSales.value/count.value).toFixed(2)
</script>