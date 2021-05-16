<template>
    <div class="home container">
        <button class="logout" @click="logout">Logout</button>
        <div class="table">
            <div class="table-header">
                <div class="header__item">Horary</div>
                <div class="header__item">Motorcycles</div>
                <div class="header__item">Status</div>
            </div>
            <div class="table-content">
                <AppHour v-for="(hour, index) in hours" :key="index" :hour="hour"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    computed: {
        hours() {
            return this.$store.state.hours;
        },
        turns() {
            return this.$store.state.turns;
        },
        id_user() {
            return this.$store.state.id_user;
        }
    },
    created() {
        // Subscribe to events emit from socket that i'll expect
        this.sockets.subscribe('turns:take', (data) => {
            this.$store.dispatch('updateTurnsTake', data);
        });

        this.sockets.subscribe('turns:delete', (data) => {
            this.$store.dispatch('updateTurnsDelete', data);
        });

        // Get id_user from localstorage
        if(!this.id_user) {
            const id_user = localStorage.getItem('id_user');
            if(!id_user) {
                localStorage.removeItem('token');
                localStorage.removeItem('id_user');
                this.$store.dispatch('setAlert', { type: 'error', message: 'Session expired'});
                this.$router.push({ name: 'Login'});
                return;   
            }
            this.$store.dispatch('setIdUser', id_user);
        }

        if(!this.hours.length) {
            this.getHours();
        }

        if(!this.turns.length) {
            this.getTurns();
        }
    },
    methods: {
        getHours() {
            this.$AppService.getHours().then(async response => {
                const result = await response.json();
                if(response.status === 200) {
                    this.$store.dispatch('setHours', result);
                } else {
                    this.$store.dispatch('setAlert', { type: 'error', message: result.error });
                }
            }).catch(err => {
                console.error(err);
                this.$store.dispatch('setAlert', { type: 'error', message: 'Unexpected error' });
            });
        },
        getTurns() {
            this.$AppService.getTurns().then(async response => {
                const result = await response.json();
                if(response.status === 200) {
                    this.$store.dispatch('setTurns', result);
                } else {
                    this.$store.dispatch('setAlert', { type: 'error', message: result.error });
                }
            }).catch(err => {
                console.error(err);
                this.$store.dispatch('setAlert', { type: 'error', message: 'Unexpected error' });
            });
        },
        logout() {
            this.$store.dispatch('logout');
            this.$router.push({ name: 'Login' });
            // Unsubscribe from events
            this.sockets.unsubscribe('turns:take');
            this.sockets.unsubscribe('turns:delete');
            // and disconnect from socket
            this.$socket.disconnect();
        }
    },
    components: {
        AppHour: () => import(/* webpackChunkName: "AppHour" */ "../components/AppHour"),
    },
};
</script>

<style>
.home {
    padding: 2rem 0;
}
.logout {
    font-size: 18px;
    background: #d62828;
    padding: 0.5rem 1rem;
    border: 1px solid #d62828;
    color: #FFF;
    cursor: pointer;
}
.table {
    width: 90%;
    max-width: 800px;
    border: 1px solid #eeeeee;
    margin: 1rem auto;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, .3);
}

.table-header {
    display: flex;
    width: 100%;
    background: #17558f;
    padding: 18px 0;
}

.table-row {
    display: flex;
    width: 100%;
    padding: 18px 0;
}
.table-row:nth-of-type(odd) {
    background: #eeeeee;
}

.table-data,
.header__item {
    flex: 1 1 20%;
    text-align: center;
}

.header__item {
    text-transform: uppercase;
    color: #FFF;
    font-weight: bold;
}
</style>
