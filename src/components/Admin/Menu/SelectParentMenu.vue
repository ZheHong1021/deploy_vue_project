<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
    transition="scale-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="selected?.title"
        outlined
        label="選擇父親菜單"
        v-bind="attrs"
        v-on="on"
        hide-details
        readonly
        class="white"
        style="max-width: 250px"
      >
      </v-text-field>
    </template>

    <v-card>
      <v-treeview
        :items="items"
        :active="active"
        :open="open_items"
        max-width="250"
        hoverable
        activatable
        item-key="id"
        item-text="title"
        item-children="children"
        @update:active="updateActive"
        :readonly="readonly"
        return-object>
        <template v-slot:prepend="{ item, open }">
          <v-icon>
            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
          </v-icon>
        </template>
      </v-treeview>
    </v-card>
  </v-menu>
</template>

<script>
import { MenuService } from "@/api/services";
export default {
  name: "SelectParentMenu",
  props: {
    value: {
      type: String,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
   
  },
  data() {
    return {
      menu: false, // open /close


      //#region (API)
      loading: true,
      items: [],
      //#endregion
    };
  },


  async mounted() {
    this.fetchData();
  },


  computed: {
    // 將各層Array都變成同一層
    flatted_items(){
      return this.flattenTree(this.items)
    },

    // active (選項focus效果) [Array]
    // 主要從Parent那邊v-model取得value => 得到只有長度=1的 active
    active(){
      return this.flatted_items.filter(item => item['id'] === this.value)
    },

    // open (展開使用) [Array]
    open_items(){
      // 查看上一層的ID: 有該ID有關聯均得 open
      const parent_id = this.selected?.parent
      return this.flatted_items.filter(
        (item) => 
          item['id'] === parent_id || // 剛好該open為 parent_id
          item['children'].some(sub_item => sub_item['id'] === parent_id) // parent_id還是其他parent的children
      ) 
    },

    // 當前選擇的Menu [Object]
    selected(){
      return this.active[0]
    },

    
    
  },

  methods: {
    //#region (API擷取)
    async fetchData() {
      this.loading = true;
      try {
        const params = new URLSearchParams({
          no_page: true, // 不分頁
          include_children: true, // 包含子路由
          is_children: false, // 最頂端
        });
        const response = await MenuService.get_all(params);
        if (response.status === 200) {
          this.items = response.data;
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    //#endregion
    

    // 將陣列變成 Flat
    flattenTree(items) {
      let flatItems = [];
      items.forEach(item => {
        flatItems.push(item);
        if (item.children && item.children.length > 0) {
          flatItems = flatItems.concat(this.flattenTree(item.children));
        }
      });
      return flatItems;
    },
    
    // 變更 active (點擊)
    updateActive(item) {
      const selected = item[0]; // 會是陣列
      this.$emit("select", selected?.id);
    },
  },
};
</script>

<style>
.v-treeview-node__root {
  cursor: pointer;
}
</style>