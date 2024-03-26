<template>
    <FormKit @submit="modifyData" :actions="false" type="form" form-class="flex max-lg:flex-col items-start gap-2.5 text-lg w-full">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-1 w-full">
            <FormKit v-model="from" validation="required" name="Откуда" type="text" message-class="text-[#E71616]" outer-class="w-full" input-class="bg-[#2e3035] focus:outline-none px-4 py-4 max-lg:rounded-t-xl lg:rounded-l-xl w-full" placeholder="Откуда"/>
            <FormKit v-model="where" validation="required" type="text" name="Куда" message-class="text-[#E71616]" outer-class="w-full" input-class="bg-[#2e3035] focus:outline-none px-4 py-4 w-full" placeholder="Куда"/>
            <div class="flex items-start gap-1 lg:col-span-2">                    
                <FormKit v-model="date" validation="required" type="date" name="Дата вылета" message-class="text-[#E71616]" outer-class="w-1/2" inner-class="h-full" wrapper-class="h-[60px]" input-class="bg-[#2e3035] focus:outline-none px-4 h-full w-full max-lg:rounded-bl-xl" placeholder="Когда"/>
                <FormKit v-model="type" validation="required" type="select" name="Тип билета" message-class="text-[#E71616]" outer-class="w-1/2" inner-class="h-full" wrapper-class="h-[60px]" placeholder="Тип билета" :options="['Эконом','Комфорт','Бизнес']" input-class="bg-[#2e3035] focus:outline-none px-4 h-full w-full max-lg:rounded-br-xl lg:rounded-r-xl"/>
            </div>
        </div>
        <FormKit type="submit" outer-class="h-[60px] max-lg:mx-auto" inner-class="h-full" wrapper-class="h-full" input-class="px-4 h-full rounded-xl bg-[#7DCCFF] max-lg:py-2 focus:outline-none">Найти</FormKit>
    </FormKit>
    <div class="w-full flex items-center lg:items-start gap-6 max-lg:flex-col">
        <div class="w-full lg:w-1/4 flex flex-col gap-6 bg-[#1d1e20] p-4 rounded-xl">
            <div class="flex flex-col gap-2">
                <p class="text-xl">Цена</p>
                <div class="flex items-center gap-1">
                    <input v-model="filters.minPrice" type="text" placeholder="От" class="rounded-l-xl bg-[#2e3035] p-4 w-1/2 focus:outline-none">
                    <input v-model="filters.maxPrice" type="text" placeholder="До" class="rounded-r-xl bg-[#2e3035] p-4 w-1/2 focus:outline-none">
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <p class="text-xl">Перевозчик</p>
                <select v-model="filters.carrier" class="rounded-xl bg-[#2e3035] p-4 w-full focus:outline-none">
                    <option value="Все">Все</option>
                    <option v-for="carrier in carriers" :value="carrier">{{ carrier }}</option>
                </select>
            </div>
            <button @click="filterProducts" class="px-4 py-2 rounded-xl bg-[#7DCCFF]">Применить</button>
            <button @click="removeFilter" class="px-4 py-2 rounded-xl bg-[#7DCCFF]">Сбросить фильтры</button>
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


    const { messageTitle, messageType } = storeToRefs(useMessagesStore())

    /* getData */
    const supabase = useSupabaseClient() 
    const { data } = await supabase.from('products').select("*")    

    /* modifyData */
    const { from, where, date, type } = storeToRefs(useSearchStore())
    const filterData = ref()
    const products = ref()
    const carriers = ref([])
    const modifyData = () => {
        products.value = data
        filterData.value = products.value.filter(el => {
            return el.when == new Date(date.value).toLocaleDateString('ru-RU')
        }) 
        products.value = filterData.value

        carriers.value = []    
        products.value.forEach(el => {
        if(carriers.value.indexOf(el.carrier) === -1) {
            carriers.value.push(el.carrier)
        }
    })
    }
    modifyData()

    /* add price, create filters */    
    const filters = ref({
        minPrice: "",
        maxPrice: "",
        carrier: 'Все'
    })

    /* filterProducts */
    const filterProducts = () => {
        products.value = filterData.value    
        const filter = products.value.filter(el => {
            if (el.price < filters.value.minPrice && filters.value.minPrice) {
                return false
            }
            if (el.price > filters.value.maxPrice && filters.value.maxPrice) {
                return false
            }
            if (el.carrier != filters.value.carrier && filters.value.carrier != 'Все') {
                return false
            }
            return true
        })     
        products.value = filter
    }    

    /* removeFilter */
    const removeFilter = () => {
        products.value = filterData.value
        filters.value.minPrice = ""
        filters.value.maxPrice = ""
        filters.value.carrier = 'Все'
    } 
</script>