<template>
    <div class="table-row" :class="{'taken' : taken, 'disabled' : !taken && turnsAvailable == 0}" @click="optionTurn">
        <div class="table-data">{{ hour.hour }}</div>
        <div class="table-data">{{ turnsAvailable }}</div>
        <div class="table-data">{{ status }}</div>
    </div>
</template>

<script>
export default {
    name: 'AppHour',
    props: ['hour'],
    computed: {
        id_user() {
            return this.$store.state.id_user;
        },
        turns() {
            return this.$store.state.turns;
        },
        turnsAvailable() {
            const turnsTaken = this.turns.filter(turn => turn.id_hour == this.hour.id_hour);
            return 8 - turnsTaken.length;
        },
        taken() {
            const index = this.turns.findIndex(turn => turn.id_hour == this.hour.id_hour && turn.id_user == this.id_user);
            return index != -1 ? true : false;
        },
        status() {
            let status = 'Available';
            if(this.taken) {
                status = 'Taken';
            } else if(!this.taken && this.turnsAvailable == 0) {
                status = 'Not available'
            }

            return status;
        }
    },
    methods: {
        optionTurn() {
            if(!this.taken) {
                if(this.turnsAvailable > 0) {
                    this.takeTurn(); 
                }
            } else {
                this.deleteTurn();
            }
        },
        takeTurn() {
            const id_hour = { id_hour: this.hour.id_hour };
            this.$AppService.takeTurn(id_hour).then(async response => {
                const result = await response.json();
                if(response.status !== 200) {
                    this.$store.dispatch('setAlert', { type: 'error', message: result.error });
                }
            }).catch(err => {
                console.error(err);
                this.$store.dispatch('setAlert', { type: 'error', message: 'Unexpected error' });
            });
        },
        deleteTurn() {
            const id_hour = { id_hour: this.hour.id_hour };
            this.$AppService.deleteTurn(id_hour).then(async response => {
                const result = await response.json();
                if(response.status !== 200) {
                    this.$store.dispatch('setAlert', { type: 'error', message: result.error });
                }
            }).catch(err => {
                console.error(err);
                this.$store.dispatch('setAlert', { type: 'error', message: 'Unexpected error' });
            });
        }
    }
};
</script>

<style>
.table-row {
    cursor: pointer;
    transition: .3s ease all;
    border-bottom: 1px solid;
}
.table-row:hover {
    background: #CCC;
}
.taken {
    background: #4caf50 !important;
    color: #FFF;
}
.table-row.disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: #f63a3a;
    color: #FFF;
}
</style>
