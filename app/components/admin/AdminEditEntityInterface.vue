<script setup lang="ts" generic="T extends EntityName">
const props = defineProps<{
  entityName: T;
  selectedEntity: GetEntityType<T> | undefined;
}>();

const emit = defineEmits<{
  (e: "entity-submitted" | "form-reset"): void;
}>();

const editableEntity = ref<GetEditEntityType<T>>(
  isUndefined(props.selectedEntity)
    ? { ...getDefaultEditableEntity(props.entityName) }
    : { ...mapEntityToEditableEntity(props.entityName, props.selectedEntity) }
);

const api = useApi();
const errorMessage = ref<string | undefined>(undefined);

async function submitEntity() {
  try {
    await api.postOrPutData<GetEntityType<T>, GetEditEntityType<T>>(
      isUndefined(props.selectedEntity) ? "POST" : "PUT",
      isUndefined(props.selectedEntity)
        ? `/api/${props.entityName}s/create`
        : `/api/${props.entityName}s/${props.selectedEntity.id}`,
      editableEntity.value,
      getEditEntitySchema(props.entityName)
    );
    emit("entity-submitted");
    resetForm();
  } catch (error) {
    errorMessage.value = String(error);
  }
}

function resetForm() {
  emit("form-reset");
}

//TypeScript cannot strongly type v-model for generic dynamic components (<component :is="...">), so 'as any' is necessary here. Strict typing is enforced inside each form component.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const editableEntityAny = editableEntity as any;
</script>

<template>
  <form
    class="flex flex-col gap-5 w-full max-w-xl p-4 mb-20"
    @submit.prevent="submitEntity"
  >
    <component
      :is="getAdminEditEntityFormComponent(entityName)"
      v-model="editableEntityAny"
    />

    <button type="submit" class="button">
      Envoyer
      <i class="fa-solid fa-paper-plane ml-2" />
    </button>
    <button class="cancel-button mt-5" @click="resetForm">
      Annuler
      <i class="fa-solid fa-ban ml-2" />
    </button>
  </form>

  <Snackbar
    v-if="isDefined(errorMessage)"
    type="error"
    :message="errorMessage"
    :buttons="[]"
  />
</template>
