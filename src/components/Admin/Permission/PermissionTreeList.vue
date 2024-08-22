<template>
  <v-row>
    <v-col cols="12">
    
    </v-col>

    <v-col cols="8">
        <CustomTwoColumns
            scrollable max-height="500px"
            left-header-title="待選" right-header-title="已選"
            left-header-color="primary darken-1" right-header-color="teal darken-1">
            

        </CustomTwoColumns>
    </v-col>
  </v-row>
</template>

<script>
import { PermissionService } from "@/api/services";
import CustomTwoColumns from "@/components/utils/CustomTwoColumns.vue";
export default {
  name: "PermissionTreeList",
  components: {
    CustomTwoColumns,
  },
  data() {
    return {
      loading: true,
      permissions: [],

      permission_checked: [],

    };
  },

  computed: {},

  async mounted() {
    await this.fetchPermission();
  },

  methods: {
    async fetchPermission() {
      try {
        const params = new URLSearchParams({
          page_size: -1,
        });
        const response = await PermissionService.get_all(params);
        if (response.status === 200) {
          const { data, count } = response.data;
          this.permissions = data;
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },

   
  },
};
</script>

<style scoped>
</style>