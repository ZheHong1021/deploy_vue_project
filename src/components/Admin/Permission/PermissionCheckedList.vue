<template>
  <v-row>
    <v-col cols="12" class="d-flex flex-wrap">
      <div class="label-container font-weight-bold text-subtitle-1">
          權限選擇:
      </div>

      <v-spacer></v-spacer>
      
      <div class="d-flex align-center gap-4">

        <!-- 當前選擇 -->
        <v-card outlined class="pa-2 d-flex flex-wrap gap-2" color="#ffcfc4">
          <v-icon small color="red darken-2">mdi-check-circle</v-icon>
          <span class="font-weight-black text-subtitle-2">
            當前選擇
          </span>
        </v-card>

        <!-- 角色選擇 -->
        <v-card v-if="group_checked.length > 0"
            outlined class="pa-2 d-flex flex-wrap gap-2" color="#c4e1ff">
            <v-icon small color="indigo darken-2">mdi-check-circle</v-icon>
            <span class="font-weight-black text-subtitle-2">
              角色選擇
            </span>
        </v-card>

      </div>

    </v-col>

    <v-col cols="12">
      <div class="table-container mt-1">
        <table id="table" border="1" class="black--text text-subtitle-2 text-md-subtitle-1">
          <thead class="text-subtitle-2 text-md-subtitle-1">
            <th v-for="header in headers" :key="header['value']">
                {{ header['text'] }}
            </th>
          </thead>
          <tbody align="center" class="text-subtitle-2 text-md-subtitle-1">
            <tr v-for="(value, key) in tree_permissions" :key="key">
              <td v-for="header in headers" :key="header['value']"
                :class="{
                  'is_checked': is_checked_column(value[header['value']]?.id),
                  'is_group_checked': is_group_checked(value[header['value']]?.id),
                }">
                <!-- 權限對象 -->
                <template v-if="header.value === 'content_type_name'">
                    {{ key }}
                </template>

                <!-- 全選 -->
                <template v-else-if="header.value === '全選'">
                    <v-checkbox 
                      :input-value="is_row_checked_all(value)"
                      label="全選"
                      :readonly="readonly"
                      :disabled="readonly"
                      @change="$event => toggleCheckedAll($event, value)">
                    </v-checkbox>
                </template>
                
                <!-- 其他操作 -->
                <template v-else>
                  <div class="d-flex flex-wrap justify-center align-center">
                    <!-- 唯讀或是Group選擇的則不能變更(User情況) -->
                      <v-checkbox 
                          v-model="permission_checked"
                          :value="value[header.value]['id']"
                          :label="value[header.value]['name']"
                          :readonly="readonly || is_group_checked(value[header.value]['id'])" 
                          :disabled="readonly || is_group_checked(value[header.value]['id'])"
                          @change="changePermissionChecked">
                      </v-checkbox>
                  </div>
                </template>
              </td>

          
            </tr>
          </tbody>
        </table>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { PermissionService } from "@/api/services";
export default {
  name: "PermissionCheckedList",
  props: {
    value: { // 已被選取的權限
      type: Array,
      default: () => [],
    },

    readonly: {
      type: Boolean,
      default: false,
    },

    group_checked: { // 透過Group選取的權限 (只會在 User相關頁面使用)
      type: Array,
      default: () => [],
    },

  },
  data() {
    return {
      loading: true,
      permissions: [],
      tree_permissions: {},


      permission_checked: [],

      headers: [
        {text: '權限對象', value: 'content_type_name'},
        {text: '全選', value: '全選'},
        {text: '查看', value: '查看'},
        {text: '新增', value: '新增'},
        {text: '修改', value: '修改'},
        {text: '刪除', value: '刪除'},
      ],
    };
  },

  watch: {
    value: {
      immediate: true,
      handler(newVal){
        this.permission_checked = this.value
      }
    },

    group_checked: {
      immediate: true,
      handler(newVal){
        this.permission_checked = [...new Set([...this.value, ...newVal])]
      }
    }
  },

  async mounted() {
    await this.fetchPermission();
  },

  methods: {
    //#region (API處理)
    async fetchPermission() {
      try {
        const params = new URLSearchParams({
          page_size: -1,
        });
        const response = await PermissionService.get_all(params);
        if (response.status === 200) {
          const { data, count } = response.data;
          this.permissions = data;
          await this.getTreePermission();
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    // 整理permissions
    // 1. 將permissions整理成樹狀結構
    // 2. 將permissions整理成v-treeview需要的格式
    getTreePermission() {
      const tree_permissions = {};

      for (const permission of this.permissions) {
        const { content_type_name, action } = permission;
        if (!tree_permissions[content_type_name]) {
          tree_permissions[content_type_name] = {};
        }

        if(!tree_permissions[content_type_name][action]) {
          tree_permissions[content_type_name][action] = {};
        }

        tree_permissions[content_type_name][action] = permission
      }

      this.tree_permissions = tree_permissions;
    },
    //#endregion

    // 權限選取
    changePermissionChecked($event){
      const { permission_checked } = this

      // 已經存在
      if(permission_checked.includes($event)){
        this.emitEvent(permission_checked.filter(item => item !== $event))
      }

      // 勾選
      else if($event){
        this.emitEvent(this.permission_checked)
      }
    },

    // 回傳給父層
    emitEvent($event){
      this.$emit('input', $event);
    },

    // 全選功能
    toggleCheckedAll($event, value){
      // 得到該列全部的權限id
      const permission_ids = Object.values(value).map(item => item.id);

      // true => 全選
      if($event){
        this.permission_checked = [
          ...new Set([...this.permission_checked, ...permission_ids])
        ];
      } 
      
      // false => 全部取消
      else {
        this.permission_checked = this.permission_checked.filter(
          // 只要不是該列的權限id 或 是Group選擇的就保留
          item => !permission_ids.includes(item) || this.is_group_checked(item)
        );
      }

      this.emitEvent(this.permission_checked);
    },

    // 檢查該列是否均被選取
    is_row_checked_all(value){
      const permission_ids = Object.values(value).map(item => item.id);
      return permission_ids.every((id) => this.permission_checked.includes(id));
    },

    // 檢查是否有被選取
    is_checked_column(id){
      return this.value.includes(id);
    },

    // 檢查是否被Group選中的權限
    is_group_checked(id){
      return this.group_checked.includes(id);
    }
  },
};
</script>

<style lang="scss" scoped>

.custom-checkbox .v-label {
  color: black !important;
}

/* 表格設定 */
.table-container {
  width: 100%;
  padding: 0 2px;
  overflow: auto; /* 滾動 */
  max-height: 400px; /* 固定高度(用於實現凍結窗格功能) */
}

#table {
  width: 100%;
  border: 1px solid rgb(102, 11, 11);
  border-collapse: collapse;
  height: auto;
  white-space: nowrap; /*讓文字不會因為寬度自動斷行*/
}

#table {
  thead {
    /* 凍結列位置 */
    z-index: 3; /* 不要讓 text-field給擋住了 */
    position: sticky;
    top: 0;
    background-color: rgb(0, 128, 83);
    color: white;

    th {
      /* 凍結列位置 */
      padding: 0.5rem 1rem;
    }
  }

  td {
    padding: 0.5rem;

    &.is_checked{
      background-color: #ffcfc4;
    }

    &.is_group_checked{
      background-color: #c4e1ff;
    }
  }

  tr {
    background-color: #ecf0f1; // 奇數列

    &:nth-child(even) {
      // 偶數列
      background-color: #d1d8e0;
    }
  }
}

/* 表格ScrollBar設定 */
/* width */
.table-container {
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 15px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(to right, #34495e 50%, #fc466b 50%);
    background-size: 30px 100%;
    border-radius: 10px;
  }
}
</style>
