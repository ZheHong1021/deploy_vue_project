<template>
  <v-list outlined class="pb-0 elevation-2">
    <!-- 表頭 -->
    <v-list-item v-if="!disableHeader" disabled>
      <!-- 表頭ICON -->
      <v-list-item-avatar color="grey lighten-3">
        <v-icon>{{ headerIcon }}</v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <!-- 表頭標題 -->
        <v-list-item-title class="font-weight-black text-subtitle-2">
          {{ headerTitle }}
        </v-list-item-title>

        <!-- 當前選取狀態 -->
        <v-list-item-subtitle class="d-flex flex-wrap gap-2">
            <v-chip rounded small color="success">已選: {{ value.length }}</v-chip>
            <v-chip rounded small color="deep-orange darken-1" class="white--text">
                總共: {{ items.length }}
            </v-chip>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mt-2 elevation-1"></v-divider>

    <!-- 全選 -->
    <v-list-item v-if="!disableSelectAll" ripple @mousedown.prevent @click="toggleSelectAll">
        <!-- 全選 -->
        <v-list-item-action>
            <v-icon color="indigo darken-4">
            {{ selectActionIcon }}
            </v-icon>
        </v-list-item-action>

        <!-- 文字內容 -->
        <v-list-item-content>
            <v-list-item-title> 全選 </v-list-item-title>
        </v-list-item-content>
    </v-list-item>

    <!-- 項目 -->
    <v-list-item-group
      :value="value"
      multiple
      active-class="primary--text font-weight-bold"
      @change="emitEvent"
    >
      <!-- 透過 value綁定到 selected當中 -->
      <template v-for="item in items">
        <v-list-item 
            :key="item[itemValue]" 
            :value="item[itemValue]"
            :disabled="item_is_disabled(item)">
                <template v-slot:default="{ active }">
                    <!-- 勾選 -->
                    <v-list-item-action>
                    <v-checkbox :input-value="active" color="primary"></v-checkbox>
                    </v-list-item-action>
                    <!-- 內容 -->
                    <v-list-item-content>
                        <v-list-item-title>
                            <div class="d-flex align-center gap-1">
                                <!-- 被選內容 -->
                                {{ item[itemText] }}
                                <!-- 必選 -->
                                <small v-if="item_is_disabled(item)" class="font-weight-black red--text">(*必選)</small>
                            </div>
                        </v-list-item-title>
                    </v-list-item-content>
                </template>
        </v-list-item>

        <!-- 分割線 -->
        <!-- <v-divider :key="`divider-${item[itemValue]}`"></v-divider> -->
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "CustomListGroup",
  props: {
    value: { // 回傳值
        type: Array,
        default: () => []
    },
    items: {
        type: Array,
        default: () => []
    },

    itemValue: { // 當作值的欄位名稱
        type: String,
        default: "value"
    },

    itemText: { // 顯示文字的欄位名稱
        type: String,
        default: "text"
    },

    itemDisabled: { // 允許被禁用的對象Function
        type: Function,
        default: undefined
    },

    loading: { // 載入
        type: Boolean,
        default: true,
    },

    headerIcon: { // 表頭ICON
        type: String,
        default: "mdi-information"
    },

    headerTitle: { // 表頭標題
        type: String,
        default: "選取清單"
    },

    disableHeader: { // 隱藏表頭
        type: Boolean,
        default: false,
    },

    disableSelectAll: { // 隱藏全選
        type: Boolean,
        default: false,
    },
  },
  data(){
    return {

    }
  },
  computed: {
    isAllSelected(){ // 全部都選取
        return this.items.length === this.value.length
    },

    isSomeSelected(){ // 部分選取: 不全選且超過選擇一個
        return this.value.length > 0 && !this.isAllSelected
    },

    isAllNotSelected(){ // 全部都沒選擇
        return !this.isAllSelected && !this.isSomeSelected
    },

    selectActionIcon(){ // 選擇狀態的ICON
        if(this.isAllSelected) return "mdi-close-box" // 全部選擇
        else if(this.isSomeSelected) return "mdi-minus-box" // 部分選擇
        else if(this.isAllNotSelected) return "mdi-checkbox-blank-outline" // 都未選擇
    },

    selectDisabledList(){ // 被禁止選取的列表
        // 如果沒禁用 => 則空值
        if(!this.itemDisabled) return []

        // 有進用 => 這些則無法被選取
        return this.itemDisabled(this.items) 
    }

  },

  methods: {
    emitEvent($event){
        this.$emit('input', $event)
    },

    toggleSelectAll(value){ // Toggle 全選 / 非全選
        const selected = this.isAllSelected // 當前是否已經全選
                        ? this.selectDisabledList // [True] 變成空或剩下被禁用項目
                        : this.items // [False] 這邊要變全選

        const selected_value = selected.map(item => item[this.itemValue])

        // 回傳
        this.emitEvent(selected_value)
    },

    item_is_disabled(item){ // 是否為被禁用
        const { itemValue } = this
        return this.selectDisabledList.some( (disabled_item) => item[itemValue] === disabled_item[itemValue] )
    },
  }
};
</script>

<style>
</style>