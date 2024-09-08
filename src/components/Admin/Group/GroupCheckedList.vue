<template>
    <div style="max-width: 350px;">
        <CustomListGroup
            v-model="group_checked"
            :items="groups"
            item-value="group_id"
            item-text="name_zh"
            :loading="loading"
            header-title="角色清單"
            header-icon="mdi-account-group"
            disable-select-all
            :readonly="readonly"
            @input="emitEvent">
        </CustomListGroup>

    </div>
</template>

<script>
import { GroupService } from "@/api/services";
import CustomListGroup from "@/components/utils/CustomListGroup.vue";
export default {
  name: "GroupCheckedList",
  components: {
    CustomListGroup,
  },
  props: {
    value: {
      // 已被選取的權限
      type: Array,
      default: () => [],
    },

    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: true,
      groups: [],
      group_checked: [],
    };
  },

  watch: {
    value: { // 監聽value的變化(一開始綁定)
      immediate: true,
      handler(newVal) {
        this.group_checked = this.value;
      },
    },
  },

  async mounted() {
    await this.fetchGroup();
  },

  methods: {
    async fetchGroup() {
      try {
        const params = new URLSearchParams({
          page_size: -1,
        });
        const response = await GroupService.get_all(params);
        if (response.status === 200) {
          const { data } = response.data;
          this.groups = data;
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },

    emitEvent($event) {
      this.$emit("input", $event);
    },

  },
};
</script>

<style lang="scss" scoped></style>
