<template>
    <!-- 排序資訊 -->
    <v-list min-width="280" color="amber lighten-5" >
        <!-- 有排序 -->
        <v-list-item v-if="sortBy">
            <!-- Icon -->
            <v-list-item-avatar :color="sortDesc ? 'error' : 'primary'">
                <v-icon dark>
                    {{ sortDesc ? 'mdi-sort-alphabetical-descending' : 'mdi-sort-alphabetical-ascending' }}
                </v-icon>
            </v-list-item-avatar>
        
            <!-- 排序內容 -->
            <v-list-item-content>
                <v-list-item-title class="font-weight-black">
                    {{ map_header_name[sortBy] }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ sortDesc ? '由大到小' : '由小到大' }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-spacer></v-spacer>
            
            <!-- 排序清掉 -->
            <v-tooltip top color="indigo">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on"
                        @click="clearSortable">
                        <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                </template>
                <span>清除排序</span>
            </v-tooltip>
        </v-list-item>


        <!-- 排序內容 -->
        <v-list-item v-else>
            <!-- Icon -->
            <v-list-item-avatar color="grey">
                <v-icon dark>mdi-format-text-rotation-none</v-icon>
            </v-list-item-avatar>
        
            <!-- 內容 -->
            <v-list-item-content>
                <v-list-item-title class="font-weight-black">
                    無排序操作
                </v-list-item-title>
                <v-list-item-subtitle>點擊表頭欄位操作</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: "CustomSortDisplay",
    props: {
        sortBy: {
            type: String,
            default: null
        },
        sortDesc: {
            type: Boolean,
            default: false
        },
        headers: {
            type: Array,
            default: () => []
        },
    },
    data(){
        return {

        }
    },
    computed:{
        map_header_name(){ // [排序顯示]:透過header.value 得到 header.text
            return this.headers.reduce((acc, curV)=> {
                acc[curV['value']] = curV['text'];
                return acc;
            }, {});
        },
    },
    methods: {
        clearSortable(){ // 傳回父親 => 將 sortBy給Disabled
            this.$emit('clearSortable')
        },
    }
}
</script>

<style>

</style>