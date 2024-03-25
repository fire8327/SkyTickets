<template>
    <div class="w-full flex flex-col gap-6">
        <p class="text-4xl text-center uppercase"><span class="text-[#7DCCFF]">Дружелюбное</span> сообщество</p>
        <Swiper :modules="[SwiperAutoplay, SwiperPagination]" :pagination="true" :slides-per-view="1" :loop="true" :autoplay="{delay:3500}" class="w-full lg:w-3/4 rounded-xl">
            <SwiperSlide class="flex items-center justify-center">
                <img src="/images/hero/1.jpg" alt="">
            </SwiperSlide>
            <SwiperSlide class="flex items-center justify-center">
                <img src="/images/hero/2.jpg" alt="">
            </SwiperSlide>
            <SwiperSlide class="flex items-center justify-center">
                <img src="/images/hero/3.jpg" alt="">
            </SwiperSlide>
        </Swiper>
    </div>
    <div class="flex flex-col items-center text-center gap-4 w-full">
        <p class="text-4xl uppercase">Поиск <span class="text-[#7DCCFF]">бюджетных</span> вариантов авиапутешествий</p>
        <p class="text-2xl">поможем вам в выборе</p>
        <FormKit :actions="false" type="form" input-class="flex max-lg:flex-col items-center gap-2.5 text-lg w-full">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-1 w-full">
                <FormKit type="text" input-class="bg-[#2e3035] focus:outline-none px-4 py-4 max-lg:rounded-t-xl lg:rounded-l-xl" placeholder="Откуда"/>
                <FormKit type="text" input-class="bg-[#2e3035] focus:outline-none px-4 py-4" placeholder="Куда"/>
                <div class="flex items-center gap-1 lg:col-span-2">                    
                    <FormKit type="date" input-class="bg-[#2e3035] focus:outline-none px-4 py-4 w-1/2 max-lg:rounded-bl-xl" placeholder="Когда"/>
                    <FormKit type="select" placeholder="Тип билета" :options="['Эконом','Комфорт','Бизнес']" input-class="bg-[#2e3035] focus:outline-none px-4 h-full w-1/2 max-lg:rounded-br-xl lg:rounded-r-xl"/>
                </div>
            </div>
            <FormKit type="submit" input-class="px-4 h-full rounded-xl bg-[#7DCCFF] max-lg:py-2">Найти</FormKit>
        </FormKit>
    </div>
    <div class="flex flex-col items-center text-center gap-6 w-full">
        <p class="text-4xl text-center uppercase">Наши <span class="text-[#7DCCFF]">преимущества</span></p>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[#141414] w-full">
            <div class="flex flex-col gap-4 justify-between bg-white rounded-xl border-2 border-[#565656] px-4 py-2">
                <img src="/images/advantages/1.png" alt="" class="w-1/2 mx-auto">
                <div class="flex flex-col gap-2">
                    <p class="uppercase text-lg">Быстрые перелёты</p>
                    <p class="opacity-70">Скоростное сообщение с аэропортами</p>
                </div>
            </div>
            <div class="flex flex-col gap-4 justify-between bg-white rounded-xl border-2 border-[#565656] px-4 py-2">
                <img src="/images/advantages/2.png" alt="" class="w-1/2 mx-auto">
                <div class="flex flex-col gap-2">
                    <p class="uppercase text-lg">Интересные локации</p>
                    <p class="opacity-70">Оригинальные туристические направления и места</p>
                </div>
            </div>
            <div class="flex flex-col gap-4 justify-between bg-white rounded-xl border-2 border-[#565656] px-4 py-2">
                <img src="/images/advantages/3.png" alt="" class="w-1/2 mx-auto">
                <div class="flex flex-col gap-2">
                    <p class="uppercase text-lg">Яркие впечатления</p>
                    <p class="opacity-70">Незабываемые эмоции с компанией или в одиночку</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>