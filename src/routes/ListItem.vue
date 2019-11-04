<template>
    <div class="wrapper" :class="{single: this.$router.currentRoute.name !== 'List'}">
        <div class="row header" v-if="this.$router.currentRoute.name !== 'List'">
            <div class="record">Name</div>
            <div class="record">Height</div>
            <div class="record">Mass</div>
            <div class="record">Hair color</div>
            <div class="record">Skin color</div>
            <div class="record">Eye color</div>
            <div class="record">Birth year</div>
            <div class="record">Gender</div>
        </div>
            <div class="row">
                <div v-if="userObj.edited">
                    <input class="record-input" v-for="field in iteratedFields"
                           :key="field"
                           v-model="userObj[field]"
                    />
                </div>
                <div class="record" v-else
                     v-for="field in iteratedFields"
                     :key="field"
                >{{userObj[field]}}
                </div>
            </div>
            <div class="button-container" v-if="this.$router.currentRoute.name !== 'List'">
                <div @click="onEditSave"><i class="material-icons">{{label}}</i></div>
                <div @click="onDelete"><i class="material-icons">delete</i></div>
                <div @click="onBack"><i class="material-icons">undo</i></div>
            </div>
    </div>
</template>
<script>

    export default {
        name: 'ListItem',
        props: ['hero'],
        data: function () {
            return {
                userObj: this.hero || this.$route.query.hero,
                label: 'edit',
            }
        },
        computed: {
            iteratedFields() {
                return Object.keys(this.userObj).filter(field => field !== 'id' && field !== 'edited');
            },
        },
        methods: {
            onDelete() {
                this.$router.push({path: '/', query: {deletedId: this.userObj.id}})
            },

            onEditSave() {
                console.log('onEditSave')
                this.userObj.edited = !this.userObj.edited;
                if (this.label === 'edit') {
                    this.label = 'done';
                } else {
                    this.label = 'edit';
                    this.$router.push({path: '/', query: {editedHero: this.userObj}})
                }
            },

            onBack() {
                this.$router.push({path: '/'})
            }
        },
    }
</script>


<style scoped>
    .wrapper {
        width: 1540px;
        margin: 0 auto;
    }
    .single{
         margin-top: 100px;
     }
    .button-container {
        display: flex;
        justify-content: space-between;
        width: 200px;
        margin: 50px auto auto auto;
    }

    .record-input {
        height: 20px;
        padding: 0;
        font-size: 1rem;
        width: 192px;
        text-align: center;
        box-sizing: border-box;
    }
</style>
