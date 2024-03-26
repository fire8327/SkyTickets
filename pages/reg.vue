<template>
    <div class="flex flex-col gap-8 grow items-center justify-center">
        <FormKit @submit="reg" type="form" :actions="false" form-class="w-full py-8 px-4 rounded-xl flex flex-col gap-5 items-center bg-[#1d1e20] lg:w-2/3 mx-auto">
            <div class="flex items-center max-lg:flex-col gap-2 w-full">
                <FormKit v-model="user.name" type="text" name="Фамилия" validation="required" message-class="text-[#E71616]" outer-class="w-full lg:w-2/3" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Фамилия"/>
                <FormKit v-model="user.surname" type="text" name="Имя" validation="required" message-class="text-[#E71616]" outer-class="w-full lg:w-2/3" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Имя"/>
                <FormKit v-model="user.patronymic" type="text" name="Отчество" validation="required" message-class="text-[#E71616]" outer-class="w-full lg:w-2/3" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Отчество"/>
            </div>
            <div class="flex items-center max-lg:flex-col gap-2 w-full">
                <FormKit v-model="user.login" type="text" name="Логин" validation="required" message-class="text-[#E71616]" outer-class="w-full lg:w-1/2" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Логин"/>
                <FormKit v-model="user.password" type="password" name="Пароль" validation="required" message-class="text-[#E71616]" outer-class="w-full lg:w-1/2" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="••••••"/>
            </div>
            <FormKit type="file" @change="imageToBase" accept=".png,.jpg,.jpeg,.svg,.webp,.bmp" name="Аватар" validation="required" message-class="text-[#E71616]" outer-class="w-full" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4"/>
            <div class="flex items-center max-lg:flex-col gap-2 w-full">
                <FormKit v-model="user.email" type="email" name="Email" validation="required|email" message-class="text-[#E71616]" outer-class="w-full lg:w-1/2" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Email"/>
                <FormKit v-model="user.phone" type="text" name="Номер телефона" validation="required|length:11" message-class="text-[#E71616]" outer-class="w-full lg:w-1/2" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Номер телефона"/>
            </div>
            <FormKit v-model="user.currency" type="select" :options="['RUB','USD','EUR']" name="Валюта" validation="required" message-class="text-[#E71616]" outer-class="w-full" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Валюта"/>
            <FormKit type="submit" input-class="px-4 rounded-xl bg-[#7DCCFF] py-2 w-fit focus:outline-none">Регистрация</FormKit>
        </FormKit>
        <div class="w-full flex items-center justify-between lg:w-1/2 mx-auto">
            <div class="w-1/3 bg-[#242528] h-px"></div>  
            <p class="text-xl text-[#7DCCFF]">или</p>
            <div class="w-1/3 bg-[#242528] h-px"></div>  
        </div>
        <NuxtLink to="/auth" class="px-4 py-2 bg-[#7DCCFF] w-fit rounded-xl mx-auto">Войти</NuxtLink>
        <button type="button" @click="messageTitle = null" class="fixed top-10 right-10 z-[11] cursor-pointer flex items-center gap-4 px-6 py-2 rounded-2xl w-fit text-white" :class="messageType ? ' bg-[#7DCCFF]' : 'bg-red-500'" v-if="messageTitle">
            <span>{{messageTitle}}</span>
            <Icon name="material-symbols:close-rounded" class="text-xl"/>
        </button>
    </div>
</template>

<script setup>
    const supabase = useSupabaseClient()
    const router = useRouter()
    const user = ref({
        name: "",
        surname: "",
        patronymic: "",
        login: "",
        password: "",
        image: null,
        email: "",
        phone: "",
        currency: "",
    })


    const { messageTitle, messageType } = storeToRefs(useMessagesStore())


    const imageToBase = (el) => {
        const file = el.target.files[0]
        console.log(file)
        let reader = new FileReader()
        reader.onloadend = () => {
            user.value.image = reader.result
            console.log(user.value.image) 
        }
        reader.readAsDataURL(file)
    }


    const reg = async () => {
        const { data: users, error: usersError } = await supabase
        .from('users')
        .select("*")
        .eq('login', `${user.value.login}`)

        if (users[0]) {
        user.value.login = ""
        messageTitle.value = 'Такой логин уже используется!', messageType.value = false
        setTimeout(() => {
            messageTitle.value = null
        }, 3000)
        } else {
            const { data, error } = await supabase
            .from('users')
            .insert([
                { name: user.value.name, surname: user.value.surname, patronymic: user.value.patronymic, login: user.value.login, password: user.value.password, image: user.value.image, email: user.value.email, phone: user.value.phone, currency: user.value.currency},
            ])
            .select()
            if (data) {
                console.log(data[0])
                messageTitle.value = 'Успешная регистрация!', messageType.value = true 
                setTimeout(() => {
                    messageTitle.value = null
                }, 3000) 
                router.push('/auth')
            }
        }
    } 
</script>