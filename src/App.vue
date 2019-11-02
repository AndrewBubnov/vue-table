<template>
    <div id="app">
        <div class="container">
            <div class="row header">
                <div class="record">Name</div>
                <div class="record">Height</div>
                <div class="record">Mass</div>
                <div class="record">Hair color</div>
                <div class="record">Skin color</div>
                <div class="record">Eye color</div>
                <div class="record">Birth year</div>
                <div class="record">Gender</div>
            </div>
            <ListItem v-for="hero of list"
                      :hero="hero"
                      :key="hero.id"
                      @onDelete="onDelete(hero.name)"
            />
        </div>
    </div>
</template>

<script>
import ListItem from './components/ListItem.vue'
import heroList from "@/assets/heroList.ts";


export default {
  name: 'app',
  components: {
    ListItem: ListItem
  },
    mounted(){
        this.list = this.list.map(hero => ({...hero, id: `f${(~~(Math.random()*1e8)).toString(16)}`}))
    },
    methods:{
      onDelete(name){
          this.list = this.list.filter(hero => hero.name !== name);
      }
    },
  data: function () {
    return {
      list: heroList
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
    }

    .container {
        max-width: 1600px;
        margin: auto;
    }

    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 20px;
        margin-bottom: 10px;
    }

    .record {
        width: 180px;
        text-align: center;
    }

    .header {
        width: 1232px;
        font-weight: 600;
        margin-bottom: 20px;
    }
</style>
