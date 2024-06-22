<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn @click="dialog = true">新增數據</v-btn>
        <CustomDialog v-model="dialog">
          <template v-slot:body>
            <div>
              測試內容
            </div>
          </template>
        </CustomDialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CustomDialog from "@/components/utils/CustomDialog.vue";
export default {
  components: {
    CustomDialog,
  },
  data() {
    return {
      dialog: false,
    };
  },

  computed: {},

  async mounted() {
  },

  methods: {},
};
</script>

<style>
</style>