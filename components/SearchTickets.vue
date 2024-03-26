<template>
    <FormKit :actions="false" type="form" form-class="flex max-lg:flex-col items-start gap-2.5 text-lg w-full">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-1 w-full">
            <FormKit validation="required" name="Откуда" type="text" message-class="text-[#E71616]" outer-class="w-full" input-class="bg-[#2e3035] focus:outline-none px-4 py-4 max-lg:rounded-t-xl lg:rounded-l-xl w-full" placeholder="Откуда"/>
            <FormKit validation="required" type="text" name="Куда" message-class="text-[#E71616]" outer-class="w-full" input-class="bg-[#2e3035] focus:outline-none px-4 py-4 w-full" placeholder="Куда"/>
            <div class="flex items-start gap-1 lg:col-span-2">                    
                <FormKit validation="required" type="date" name="Дата вылета" message-class="text-[#E71616]" outer-class="w-1/2" inner-class="h-full" wrapper-class="h-[60px]" input-class="bg-[#2e3035] focus:outline-none px-4 h-full w-full max-lg:rounded-bl-xl" placeholder="Когда"/>
                <FormKit validation="required" type="select" name="Тип билета" message-class="text-[#E71616]" outer-class="w-1/2" inner-class="h-full" wrapper-class="h-[60px]" placeholder="Тип билета" :options="['Эконом','Комфорт','Бизнес']" input-class="bg-[#2e3035] focus:outline-none px-4 h-full w-full max-lg:rounded-br-xl lg:rounded-r-xl"/>
            </div>
        </div>
        <FormKit type="submit" outer-class="h-[60px] max-lg:mx-auto" inner-class="h-full" wrapper-class="h-full" input-class="px-4 h-full rounded-xl bg-[#7DCCFF] max-lg:py-2 focus:outline-none">Найти</FormKit>
    </FormKit>
</template>