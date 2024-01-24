
<script setup lang="ts">
import type { StructuredRecommender } from '~/types';

interface Props {
    filter: StructuredRecommender;
    criteria?: string;
    class?: string;
    group?: string;
    globalFilters: boolean
}

const props = withDefaults(defineProps<Props>(), { class: 'text-white text-bold bg-black h-5 w-5 rounded-full flex items-center justify-center mr-2' })

// Use key state from filter to get filters state listed by group
const activeFilter = computed(() => props.filter.state.value)

const criteriaCount = computed(() => {
    if (activeFilter.value[props.group]) {
    
        let count: number = 0
        for (const crit of activeFilter.value[props.group]) {            
            if (crit.criteria === props.criteria) {
                count++ 
            }
        }
   return count
    }
    return null
})

const globalFiltersCount = computed(() => {
    let count :number = 0

    for (const key in activeFilter.value) {
            count += activeFilter.value[key].length
    }
    return count
})


</script>

<template>
    <div v-if="(!props.group || globalFilters) && globalFiltersCount " class="">
        <div  :class="props.class">
            <p>{{globalFiltersCount}}</p>
        </div>
    </div>

    <div v-else-if="criteriaCount" class=" translate-x-1/2 w-fit ">
        <div :class="props.class">
            <p>{{criteriaCount}}</p>
        </div>
    </div>
</template>