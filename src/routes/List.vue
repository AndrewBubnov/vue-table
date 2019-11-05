<template>
    <div id="app">
        <div class="container">
            <div class="row header">
                <div class="header-record">Name</div>
                <div class="header-record">Height</div>
                <div class="header-record">Mass</div>
                <div class="header-record">Hair color</div>
                <div class="header-record">Skin color</div>
                <div class="header-record">Eye color</div>
                <div class="header-record">Birth year</div>
                <div class="header-record">Gender</div>
            </div>
            <div class="row header">
                <SearchInput
                        :key="field"
                        v-for="field in iteratedFields"
                        :list="displayed"
                        :field="field"
                        @onSearch="onSearch"
                />
            </div>
            <div class="row header">
                <div :key="field"
                     v-for="field in iteratedFields"
                     @click="onSort(field)"
                     class="record"
                ><i class="material-icons">sort</i>
                </div>
            </div>
            <ListItem v-for="hero in shown"
                      :hero="hero"
                      :key="hero.id"
                      @click.native="onClick(hero)"
            />
            <div class="add-container"><div>Add new</div><i class="material-icons add" @click="onAdd">add</i></div>
            <Pagination
                    :currentPage="page"
                    :listLength="listLength"
                    :recordsPerPage="perPage"
                    @setPage="setPage"
            />
            <div class="warning" :class="{show: showWarning}">{{this.warning}}</div>
        </div>
    </div>
</template>

<script>
    import ListItem from '@/routes/ListItem.vue'
    import SearchInput from "@/components/SearchInput";
    import Pagination from "@/components/Pagination";
    import heroList from "@/assets/heroList";
    import Hero from "@/models/Hero";



    const interval = 60*60*3;                                                      //interval in seconds of new items add

    export default {
        name: 'List',
        components: {
            Pagination,
            SearchInput,
            ListItem
        },
        mounted(){
            if (localStorage.getItem('heroList')){
                this.list = JSON.parse(localStorage.getItem('heroList'));
            } else {
                const list = heroList.map(hero => ({...hero,
                    id: `f${(~~(Math.random()*1e8)).toString(16)}`, edited: false}));
                localStorage.setItem('heroList', JSON.stringify(list));
                this.list = list;
            }

            if (this.$route.query.deletedId){
                console.log('deletedId = ', this.$route.query.deletedId)
                this.list = this.list.filter(hero => hero.id !== this.$route.query.deletedId);
                localStorage.setItem('heroList', JSON.stringify(this.list));
            }

            if (this.$route.query.editedHero && this.$route.query.editedHero.id) {
                const edited = this.$route.query.editedHero;
                const heroIndex = this.list.findIndex(hero => hero.id === edited.id);
                if (heroIndex === -1) {
                    this.list.push(this.$route.query.editedHero)
                } else {
                    this.list.splice(heroIndex, 1, edited);
                }
                localStorage.setItem('heroList', JSON.stringify(this.list));
            }
        },

        computed: {
            iteratedFields() {
                let fields = [];
                if (this.list.length > 0){
                    fields = Object.keys(this.list[0]).filter(field => field !== 'id' && field !== 'edited');
                }
                return fields;
            },

            searchedList() {
                return this.searched.length > 0 ? this.searched : this.list;
            },

            displayed() {
                if (this.searched.length > 0) {
                    return this.searchedList
                } else {
                    let page = this.page;
                    let perPage = this.perPage;
                    let from = (page * perPage) - perPage;
                    let to = (page * perPage);
                    return this.searchedList.slice(from, to);
                }
            },

            shown() {
                if (this.sortedBy){
                    const key = this.sortedBy;
                    return this.displayed.slice().sort((a, b) => {
                        let result = 0;
                        if (!isNaN(parseFloat(a[key])) && !isNaN(parseFloat(a[key])) &&
                            typeof parseFloat(a[key]) === 'number' && typeof parseFloat(b[key]) === 'number'){
                            result = parseFloat(a[key]) - parseFloat(b[key]);
                        } else {
                            result = a[key] > b[key] ? 1 : -1;
                        }
                        return result;
                    });
                } else {
                    return this.displayed;
                }
            },

            //apparently sorting should have been done with 'displayed' property only, but, in some reasons, sorted
            // 'displayed' array is not seen outside the onSort function. Lost too much time for this.

            listLength() {
                return this.list.length;
            },

            showWarning() {
                return this.warning.length > 0
            }
        },
        methods:{

            onSort(key) {
                this.sortedBy = key;
            },

            onSearch(list){
                this.searched = list;
            },

            setPage(page) {
                this.page = page;
                this.sortedBy = '';
            },

            onClick(hero) {
                this.$router.push({path: '/hero', query: {hero}})
            },

            onAdd() {
                const lastHeroTime = localStorage.getItem('heroTime');
                if (!lastHeroTime || Date.now() - lastHeroTime > interval * 1000){
                    console.log(Date.now() - lastHeroTime)
                    localStorage.setItem('heroTime', Date.now() + '');
                    const hero = new Hero('','','','','','','','');
                    hero.edited = true;
                    hero.id = `f${(~~(Math.random()*1e8)).toString(16)}`;
                    this.$router.push({path: '/new', query: {hero}})
                } else {
                    setTimeout(() => (this.warning = ''), 3000);
                    this.warning = `Please wait for ${Math.floor((Date.now() - lastHeroTime) / 1000)} sec to add item`
                }

            }
        },
        data: function() {
            return {
                list: [],
                searched: [],
                page: 1,
                perPage: 10,
                sortedBy: '',
                warning: '',
            }
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        box-sizing: border-box;
    }
    .container {
        max-width: 1440px;
        margin: auto;
    }
    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 20px;
        margin-bottom: 30px;
    }
    .record {
        width: 180px;
        text-align: center;
        font-size: 1.2rem;
        cursor: pointer;
    }
    .header-record {
        width: 180px;
        text-align: center;
    }
    .header {
        width: 1540px;
        font-weight: 600;
        margin-bottom: 20px;
    }
    .material-icons {
        font-size: 20px;
        color: #364c5e;
        cursor: pointer;
    }
    .add-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 1540px;
        color: darkgreen;
        font-size: 20px;
    }
    .add{
        color: darkgreen;
        font-size: 40px;
    }
    .warning{
        display: flex;
        justify-content: center;
        width: 1540px;
        font-size: 1.2rem;
        color: darkred;
        opacity: 0;
        margin-top: 10px;
        transition: opacity .7s;
    }
    .show{
        opacity: 1;
    }

</style>