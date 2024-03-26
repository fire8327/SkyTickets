<template>
    <div class="flex flex-col gap-8 grow items-center justify-center">
        <FormKit type="form" :actions="false" form-class="w-full py-8 px-4 rounded-xl flex flex-col gap-5 items-center bg-[#1d1e20] lg:w-2/3 mx-auto">
            <div class="flex items-center max-lg:flex-col gap-2 w-full">
                <FormKit type="text" name="Фамилия" validation="required" message-class="text-[#E71616]" outer-class="w-full lg:w-2/3" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Фамилия"/>
                <FormKit type="text" name="Имя" validation="required" message-class="text-[#E71616]" outer-class="w-full lg:w-2/3" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Имя"/>
                <FormKit type="text" name="Отчество" validation="required" message-class="text-[#E71616]" outer-class="w-full lg:w-2/3" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Отчество"/>
            </div>
            <div class="flex items-center max-lg:flex-col gap-2 w-full">
                <FormKit type="text" name="Логин" validation="required" message-class="text-[#E71616]" outer-class="w-full lg:w-1/2" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Логин"/>
                <FormKit type="text" name="Пароль" validation="required" message-class="text-[#E71616]" outer-class="w-full lg:w-1/2" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="••••••"/>
            </div>
            <FormKit type="file" accept=".png,.jpg,.jpeg,.svg,.webp,.bmp" name="Аватар" validation="required" message-class="text-[#E71616]" outer-class="w-full" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4"/>
            <div class="flex items-center max-lg:flex-col gap-2 w-full">
                <FormKit type="email" name="Email" validation="required|email" message-class="text-[#E71616]" outer-class="w-full lg:w-1/2" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Email"/>
                <FormKit type="text" name="Номер телефона" validation="required|length:11" message-class="text-[#E71616]" outer-class="w-full lg:w-1/2" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Номер телефона"/>
            </div>
            <FormKit type="select" :options="['RUB','USD','EUR']" name="Валюта" validation="required" message-class="text-[#E71616]" outer-class="w-full" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Валюта"/>
            <FormKit type="submit" input-class="px-4 rounded-xl bg-[#7DCCFF] py-2 w-fit focus:outline-none">Регистрация</FormKit>
        </FormKit>
        <div class="w-full flex items-center justify-between lg:w-1/2 mx-auto">
            <div class="w-1/3 bg-[#242528] h-px"></div>  
            <p class="text-xl text-[#7DCCFF]">или</p>
            <div class="w-1/3 bg-[#242528] h-px"></div>  
        </div>
        <NuxtLink to="/auth" class="px-4 py-2 bg-[#7DCCFF] w-fit rounded-xl mx-auto">Войти</NuxtLink>
    </div>
</template>

<script setup>

</script>