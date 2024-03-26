<template>
    <div class="flex flex-col gap-8 grow items-center justify-center">
        <FormKit type="form" :actions="false" form-class="w-full py-8 px-4 rounded-xl flex flex-col gap-4 items-center bg-[#1d1e20] lg:w-1/2 mx-auto">
            <FormKit type="text" name="Логин" validation="required" message-class="text-[#E71616]" outer-class="w-full md:w-1/2 lg:w-2/3" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Логин"/>
            <FormKit type="text" name="Пароль" validation="required" message-class="text-[#E71616]" outer-class="w-full md:w-1/2 lg:w-2/3" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="••••••"/>
            <FormKit type="submit" input-class="px-4 rounded-xl bg-[#7DCCFF] py-2 w-fit focus:outline-none">Вход</FormKit>
        </FormKit>
        <div class="w-full flex items-center justify-between lg:w-1/2 mx-auto">
            <div class="w-1/3 bg-[#242528] h-px"></div>  
            <p class="text-xl text-[#7DCCFF]">или</p>
            <div class="w-1/3 bg-[#242528] h-px"></div>  
        </div>
        <NuxtLink to="/reg" class="px-4 py-2 bg-[#7DCCFF] w-fit rounded-xl mx-auto">Зарегистрироваться</NuxtLink>
    </div>
</template>

<script setup>

</script>