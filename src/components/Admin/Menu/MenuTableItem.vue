<template>
  <tr>
    <template v-for="header in headers">
      <!-- Expand -->
      <td v-if="header['value'] === 'data-table-expand'"
          :key="header['value']">
        <v-btn icon @click="expand(!isExpanded)" 
            v-if="item['children'] && item['children'].length > 0">
            <v-icon>{{ isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </td>

      <!-- Actions -->
      <td v-else-if="header['value'] === 'actions'"
          :key="header['value']" @click.stop class="py-4">
        <template v-for="btn in actions_buttons">
          <v-tooltip 
              :key="btn['title']"
              bottom 
              :color="btn['tooltip_color']">
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab x-small class="mx-1" v-bind="attrs" v-on="on"
                     :color="btn['btn_color']"
                     @click="btn.onClick(item['id'])">
                <v-icon small :color="btn['icon_color']">{{ btn['icon'] }}</v-icon>
              </v-btn>
            </template>
            <span class="black--text font-weight-bold">{{ btn['title'] }}</span>
          </v-tooltip>
        </template>
      </td>

      <!-- icon -->
      <td v-else-if="header['value'] === 'icon'"
          :key="header['value']">
        <v-icon>{{ item['icon'] }}</v-icon>
      </td>

      <!-- priority -->
      <td v-else-if="header['value'] === 'priority'"
          :key="header['value']">
        <v-avatar size="24" color="grey darken-2" class="font-weight-bold white--text">{{ item['priority'] }}</v-avatar>
      </td>

      <td v-else
          :key="`${header['value']}-1`">
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
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    expand: {
      type: Function,
      required: true
    },
    isExpanded: {
      type: Boolean,
      required: true
    },
    actions_buttons: {
      type: Array,
      required: true
    }
  },

};
</script>

<style scoped>

</style>
