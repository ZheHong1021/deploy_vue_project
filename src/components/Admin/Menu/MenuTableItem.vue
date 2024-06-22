<template>
  <tr :class="{'expanded-row' : item['parent'] && !isExpanded}">
    <template v-for="header in headers">
      <!-- Expand -->
      <td
        v-if="header['value'] === 'data-table-expand'"
        class="data-table-expand-column"
        :key="header['value']"
      >
        <v-btn
          icon
          @click="expand(!isExpanded)"
          :disabled="!checkHasChildren(item)"
          :color="
            isExpanded ? 'purple' : checkHasChildren(item) ? 'primary' : ''
          "
        >
          <v-icon>{{
            isExpanded
              ? "mdi-arrow-up-drop-circle"
              : "mdi-arrow-down-drop-circle"
          }}</v-icon>
        </v-btn>
      </td>

      <!-- title -->
      <td
        v-else-if="header['value'] === 'title'"
        :class="`column-depth-${depth}-padding`"
        class="title-column"
        :key="header['value']"
      >
        {{ item["title"] }}
      </td>


      <!-- Actions -->
      <td
        v-else-if="header['value'] === 'actions'"
        :key="header['value']"
        class="py-4 actions-column"
      >
        <div class="d-flex">
          <template v-for="btn in actions_buttons">
              <v-tooltip :key="btn['title']" bottom :color="btn['tooltip_color']">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    x-small
                    class="mx-1"
                    v-bind="attrs"
                    v-on="on"
                    :color="btn['btn_color']"
                    @click="btn.onClick(item['id'])"
                  >
                    <v-icon small :color="btn['icon_color']">{{
                      btn["icon"]
                    }}</v-icon>
                  </v-btn>
                </template>
                <span class="black--text font-weight-bold">{{ btn["title"] }}</span>
              </v-tooltip>
            </template>
        </div>
      </td>

      

      <!-- icon -->
      <td
        v-else-if="header['value'] === 'icon'"
        class="icon-column"
        :key="header['value']"
      >
        <v-icon>{{ item["icon"] }}</v-icon>
      </td>

      <!-- priority -->
      <td
        v-else-if="header['value'] === 'priority'"
        class="priority-column"
        :key="header['value']"
      >
        <v-avatar
          size="24"
          :color="depth_priority_color[depth]"
          class="font-weight-bold white--text"
          >{{ item["priority"] }}</v-avatar
        >
      </td>
      
      <!-- path -->
      <td
        v-else-if="header['value'] === 'path'"
        class="path-column"
        :key="header['value']"
      >
      {{ item[header.value] }}
      </td>
      
      <!-- component -->
      <td
        v-else-if="header['value'] === 'component'"
        class="component-column"
        :key="header['value']"
      >
      {{ item[header.value] }}
      </td>

      <!-- name -->
      <td
        v-else-if="header['value'] === 'name'"
        class="name-column"
        :key="header['value']"
      >
      {{ item[header.value] }}
      </td>
      
      <!-- redirect -->
      <td
        v-else-if="header['value'] === 'redirect'"
        class="redirect-column"
        :key="header['value']"
      >
      {{ item[header.value] }}
      </td>
      
      <!-- is_menu -->
      <td
        v-else-if="header['value'] === 'is_menu'"
        class="is_menu-column"
        :key="header['value']">
        <v-chip label small
          class="black--text font-weight-bold elevation-2"
          :color="item[header.value] ? 'success lighten-4' : 'error lighten-4'">
          <v-icon :color="item[header.value] ? 'success darken-1' : 'error darken-1'" x-small left>
            mdi-circle
          </v-icon>

          {{ item[header.value] ? '是' : '否' }}
        </v-chip>
      </td>


      <td v-else class="other-column" :key="`${header['value']}-1`">
        {{ item[header.value] }}
      </td>
    </template>
  </tr>
</template>

<script>
export default {
  name: "MenuTableItem",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    headers: {
      type: Array,
      default: () => [],
    },
    expand: {
      type: Function,
      default: undefined,
    },
    isExpanded: {
      type: Boolean,
      default: false,
    },
    depth: {
      type: Number,
      default: 1,
    },
    actions_buttons: {
        type: Array,
        required: () => [],
    },
  },
  
  
  
  
  
  data(){
    return {
      depth_priority_color: {
        1: '#342974',
        2: '#4D2A79',
        3: '#682A7E',
        4: '#822B7F',
        5: '#872B68',
      }
    }
  },

  methods: {
    checkHasChildren(item) {
      return item["children"] && item["children"].length > 0;
    },
  },
};
</script>


<style scoped>

    .expanded-row td:first-child{
      border-left: 0.25rem solid rgb(159, 10, 159);
    }

    td.column-depth-1-padding{
        padding-left: 1rem !important;
    }
    td.column-depth-2-padding{
        padding-left: 1.5rem !important;
    }
    td.column-depth-3-padding{
        padding-left: 2rem !important;
    }
    td.column-depth-4-padding{
        padding-left: 2.5rem !important;
    }

    td.data-table-expand-column{
        width: 70px;
        min-width: 70px;
    }

    td.title-column{
      width: 150px;
      min-width: 150px;
    }
    td.actions-column{
      width: 160px;
      min-width: 160px;
    }
    td.icon-column{
      width: 130px;
      min-width: 130px;
    }
    td.priority-column{
      width: 130px;
      min-width: 130px;
    }
    td.path-column{
      width: 180px;
      min-width: 180px;
    }
    td.name-column{
      width: 120px;
      min-width: 120px;
    }
    td.is_menu-column{
      width: 80px;
      min-width: 80px;
    }
    td.component-column{
      width: 200px;
      min-width: 200px;
    }
    td.redirect-column{
      /* width: 180px; */
      /* min-width: 180px; */
    }
    td.other-column{
      width: 100px;
      min-width: 100px;
    }

</style>