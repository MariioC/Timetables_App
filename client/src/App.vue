<template>
    <div id="app">
        <AppAlert v-if="alert.type"/>
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    computed: {
        alert() {
            return this.$store.state.alert;
        }
    },
    components: {
        AppAlert: () => import(/* webpackChunkName: "AppAlert" */ './components/AppAlert')
    }
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    background: #fcfcfc;
    font-size: 18px;
    text-align: center;
    color: #353535;
}
button,
input {
    font-size: 16px;
    text-align: center;
}
.container {
    width: 100%;
    max-width: 1200px;
    margin: 1rem auto;
}
.text-center {
    text-align: center;
}
</style>
