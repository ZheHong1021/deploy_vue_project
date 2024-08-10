<template>
  <v-dialog 
    :value="value" 
    persistent 
    :width="width">
        <v-card :color="color" dark class="py-4">
            <v-card-title class="d-flex flex-column justify-center align-center pb-0 mb-0">
                <h6 class="font-weight-bold text-subtitle-1">
                    {{title}} {{ export_dot }}
                </h6>
            </v-card-title>

            <v-card-text class="d-flex flex-column justify-center align-center pb-0 mt-1">
                <p class="mb-0 pb-0">花費時間: {{export_count}}秒</p>

                <v-progress-linear
                    indeterminate
                    color="white"
                    class="my-4"
                    height="6"
                    rounded
                ></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "CustomGlobalLoading",
    props: {
        value: { // 是否載入
            type: Boolean,
            default: true,
        },
        width: { // 寬度
            type: Number,
            default: 300,
        },
        color: { // 背景顏色
            type: String,
            default: "primary",
        },
        title: { // 載入標題
            type: String,
            default: "載入數據",
        },
    },

    data(){
        return {
            export_count: 0, // 計時秒數
            export_dot: '', // ...
            export_max_dot: 3, // 最大的dot數量(4個)
        }
    },

    watch:{
        value(newVal){
            if(newVal){ // 為 True時，開始計時器
                this.export_count = 0 // 從0開始
                this.exportInterval = setInterval(() => {
                    this.export_count += 1
                    if(this.export_dot.length >= this.export_max_dot){
                        this.export_dot = ""
                    }
                    this.export_dot += "."
                }, 1000);
            }else{ // 為False時，關閉計時器(否則會一直跑)
                clearInterval(this.exportInterval )
                this.export_dot = ""
            }
        },
    },

    
    
}
</script>

<style>

</style>