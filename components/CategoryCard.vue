<template>
  <b-card no-body class="mb-1">
    <b-card-header onfocus="this.blur();" header-tag="header" class="p-0" role="tab">
      <b-btn 
        onfocus="this.blur();"
        class="rounded-0 p-2 text-left font-weight-bold" 
        block href="#" 
        v-b-toggle="accordionId"
        variant="info">{{ title }}</b-btn>
    </b-card-header>
    <b-collapse v-bind:id="accordionId" accordion="my-accordion" role="tabpanel">
      <b-card-body class="p-0">
      <div class="list-group">
        <div v-for="(work, index) in works" :key=work.name>
          <button 
            type="button" 
            onfocus="this.blur();" 
            class="list-group-item list-group-item-action p-2"
            @click="$emit('tappedWork', work)">
            {{work.name}}
          </button>
        </div>
      </div>          
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  props: {
    works: {
      type: Array
    },
    accordionId: {
      type: String,
      default: 'accordion1'
    },
    title: {
      type: String,
      default: 'Web Applications'
    }
  }
}
</script>