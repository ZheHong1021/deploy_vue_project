<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <RecursiveTableVue
          :items="items"
          :headers="headers">
        </RecursiveTableVue>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecursiveTableVue from '@/components/Path/RecursiveTable.vue';
export default {
  components: {
    RecursiveTableVue
  },
  data() {
    return {
      expanded: [],

      headers: [
        { text: "", value: "data-table-expand" },
        { text: "name", value: "name" },
        { text: "fat", value: "fat" },
      ],

      items: [
        {
          name: "Frozen Yogurt",
          fat: 6.0,
          children: [
            {
              name: "123",
              fat: 6.0,
              children: [
              {
                name: "11111",
                fat: 6.0,
              },
              {
                name: "456",
                fat: 9.0,
              },
            ],
            },
            {
              name: "456",
              fat: 9.0,
            },
            {
              name: "123123",
              fat: 16.0,
            },
          ],
        },
        {
          name: "Ice cream sandwich",
          fat: 9.0,
          children: [],
        },
        {
          name: "Eclair",
          fat: 16.0,
          children: [],
        },
      ],
    };
  },

  computed: {},

  async mounted() {},

  methods: {},
};
</script>

<style></style>