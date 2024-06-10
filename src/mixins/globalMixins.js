export const globalMixins = {
    data(){
        return {

        }
    },
    
    mounted(){

    },

    computed: {
        // 查看手機目前介面的size (xs → sm → md → lg → xl)【由小排到大】
         rwd_name(){
            return this.$vuetify.breakpoint.name;
        },
        is_mobile(){ // 是否為手機介面(vuetify)
            return this.rwd_name === 'xs'
        },
        is_tablet(){ // 是否為平板介面(vuetify)
            return this.rwd_name === 'sm'
        },

    },

    methods: {

    },


}