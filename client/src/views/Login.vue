<template>
    <div class="login container">
        <form @submit.prevent="createUser">
            <h1 class="text-center">¡¡Welcome!!</h1>
            <p>Type an username, and sign In to the platform</p>
            <label>
                Username
                <input type="text" v-model="username" placeholder="Choose an username">
            </label>
            <button type="submit" :disabled="!username">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            username: null
        }
    },
    methods: {
        createUser() {
            const username = this.username;
            const data = {
                username: username.trim()
            }

            this.$AppService.createUser(data).then(async response => {
                const result = await response.json();
                if(response.status === 200) {
                    const { token, id_user } = result;
                    localStorage.setItem('token', token);
                    localStorage.setItem('id_user', id_user);
                    this.$store.dispatch('setIdUser', id_user);
                    // Connect to socket
                    this.$socket.connect();
                    this.$router.push({ name: 'Home' });
                } else {
                    alert(result.Error);
                }
            }).catch(err => {
                console.error(err);
                this.$store.dispatch('setAlert', { type: 'error', message: 'Unexpected error'});
            });
        }
    },
}
</script>

<style scoped>

.login form {
    background: #FFF;
    width: 90%;
    max-width: 500px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, .3);
    margin: 5rem auto;
    padding: 2rem;
}

input,
button {
    widows: 100%;
    display: block;
    margin: 0.5rem auto;
    padding: 0.6rem 0.9rem;
    border: 2px solid;
    margin-top: 1rem;
}
button {
    background: #265a96;
    border-color: #265a96;
    color: #FFF;
    transition: .3s ease all;
    cursor: pointer;
}
button:hover {
    background: #FFF;
    color: #265a96;
}
button:disabled  {
    opacity: 0.7;
    cursor: not-allowed;
}
</style>