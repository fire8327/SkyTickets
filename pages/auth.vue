<template>
    <div class="flex flex-col gap-8 grow items-center justify-center">
        <FormKit @submit="auth" type="form" :actions="false" form-class="w-full py-8 px-4 rounded-xl flex flex-col gap-4 items-center bg-[#1d1e20] lg:w-1/2 mx-auto">
            <FormKit v-model="user.login" type="text" name="Логин" validation="required" message-class="text-[#E71616]" outer-class="w-full md:w-1/2 lg:w-2/3" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="Логин"/>
            <FormKit v-model="user.password" type="password" name="Пароль" validation="required" message-class="text-[#E71616]" outer-class="w-full md:w-1/2 lg:w-2/3" input-class="focus:outline-none bg-[#242528] rounded-full w-full border border-[#7DCCFF] py-2 px-4" placeholder="••••••"/>
            <FormKit type="submit" input-class="px-4 rounded-xl bg-[#7DCCFF] py-2 w-fit focus:outline-none">Вход</FormKit>
        </FormKit>
        <div class="w-full flex items-center justify-between lg:w-1/2 mx-auto">
            <div class="w-1/3 bg-[#242528] h-px"></div>  
            <p class="text-xl text-[#7DCCFF]">или</p>
            <div class="w-1/3 bg-[#242528] h-px"></div>  
        </div>
        <NuxtLink to="/reg" class="px-4 py-2 bg-[#7DCCFF] w-fit rounded-xl mx-auto">Зарегистрироваться</NuxtLink>
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
        login: "",
        password: ""
    })


    const userStore = useUserStore()
    const { messageTitle, messageType } = storeToRefs(useMessagesStore())


    const auth = async() => {    
        let { data: users, error } = await supabase
        .from('users')
        .select("*")
        .eq('login', `${user.value.login}`)
    
        if (!users[0]) {
            messageTitle.value = 'Неверно введен логин!', messageType.value = false
            user.value.login = ""
            setTimeout(() => {
                messageTitle.value = null
            }, 3000) 
        } else { 
            console.log(users[0])  
            if (user.value.password != users[0].password){
                messageTitle.value = 'Неверно введен пароль!', messageType.value = false
                user.value.password = ""
                setTimeout(() => {
                    messageTitle.value = null
                }, 3000) 
            } else {
                messageTitle.value = 'Успешный вход!', messageType.value = true
                setTimeout(() => {
                    messageTitle.value = null
                }, 3000) 
                userStore.authenticated = true
                userStore.id = users[0].id
                router.push('/') 
            }
        }
    } 
</script>