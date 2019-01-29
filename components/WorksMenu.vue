<template>
  <div role="tablist">
    <category-card :works=works :accordionId="'accordion2'" :title="'Mobile Applications'" />

  </div>    
</template>

<script>
import data from '@/assets/data/data.json'
import CategoryCard from '@/components/CategoryCard'

export default {
  data () {
    return {      
      works: data,
    }
  },
  components: {
    CategoryCard    
  }
}
</script>