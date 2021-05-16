<template>
    <div class="alert" :class="alert.type">
        <div class="message">
            <h3>{{ alert.type }}</h3>
            <p>{{ alert.message }}</p>
        </div>
        <span class="dismiss" @click="dismiss">x</span>
    </div>
</template>

<script>
export default {
    name: 'AppAlert',
    computed: {
        alert() {
            return this.$store.state.alert
        }
    },
    methods: {
        dismiss() {
            // set the alert in store with empty values.
            this.$store.dispatch('setAlert', { type: null, message: null });
        }
    },
};
</script>

<style>
.alert {
    position: fixed;
    top: 1rem;
    right: 1rem;
    width: 100%;
    max-width: 250px;
    z-index: 99;
    background: #FFF;
    padding: 1rem 0.8rem 1.5rem 0.8rem;
    color: #FFF;
}
.message h3 {
    margin-bottom: 0.5rem;
    text-transform: uppercase;
}
.success {
    background: #4caf50;
    box-shadow: 0px 0px 30px rgba(76, 175, 80, 0.5);
}
.error {
    background: #ea594f;
    box-shadow: 0px 0px 30px rgba(234, 89, 79, 0.5);
}
.dismiss {
    position: absolute;
    top: 0;
    right: 8px;
    font-size: 24px;
    cursor: pointer;
}

</style>
