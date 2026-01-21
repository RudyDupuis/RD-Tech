<script setup lang="ts">
import z from "zod";

const props = defineProps<{
  entityName: EntityName;
}>();

type EntityType = GetEntityType<typeof props.entityName>;

const api = useApi();

const entities = ref<EntityType[]>([]);
const isLoading = ref<boolean>(true);
const errorMessage = ref<string | undefined>(undefined);

async function loadEntities() {
  try {
    entities.value = await api.getData<EntityType[]>(
      `/api/${props.entityName}s`,
      z.array(getEntitySchema(props.entityName))
    );
  } catch (error) {
    errorMessage.value = String(error);
  } finally {
    isLoading.value = false;
  }
}
loadEntities();

const showForm = ref<boolean>(false);
const entityToUpdate = ref<EntityType | undefined>(undefined);
const entityToDelete = ref<EntityType | undefined>(undefined);

async function deleteEntity(entity: EntityType) {
  try {
    await api.deleteData(`/api/${props.entityName}s/${entity.id}`);
    await loadEntities();
    entityToDelete.value = undefined;
  } catch (error) {
    errorMessage.value = String(error);
  }
}

function openDeletionModal(entity: EntityType) {
  entityToDelete.value = entity;
  closeEditForm();
}
function closeDeletionModal() {
  entityToDelete.value = undefined;
}

async function openEditForm(entity: EntityType) {
  closeEditForm();

  await nextTick();
  entityToUpdate.value = entity;
  showForm.value = true;
}
function closeEditForm() {
  entityToUpdate.value = undefined;
  showForm.value = false;
}

function hasSvg(
  entity: EntityType
): entity is Extract<EntityType, { svg: string }> {
  return props.entityName === "soft-skill" || props.entityName === "hard-skill";
}
function hasThumbnail(
  entity: EntityType
): entity is Extract<EntityType, { thumbnail: string | null }> {
  return (
    props.entityName === "project-experience" ||
    props.entityName === "job-experience" ||
    props.entityName === "training-experience"
  );
}
</script>

<template>
  <button v-if="!showForm" class="button mb-20" @click="showForm = true">
    <p>
      Nouveau
      <i class="fa-solid fa-pen-to-square ml-2" />
    </p>
  </button>

  <AdminEditEntityInterface
    v-if="showForm"
    :entity-name="props.entityName"
    :selected-entity="entityToUpdate"
    @entity-submitted="loadEntities"
    @form-reset="closeEditForm"
  />

  <ul
    v-if="!isLoading"
    class="mb-20 flex flex-wrap items-center justify-center gap-10 px-10"
  >
    <li
      v-for="entity in entities.sort((a, b) => a.name.localeCompare(b.name))"
      :key="entity.id"
      class="size-30"
    >
      <i
        class="fa-solid fa-trash text-false cursor-pointer hover:text-secondary"
        @click="openDeletionModal(entity)"
      />
      <div
        class="flex flex-col items-center cursor-pointer hover:text-secondary fill-dark hover:fill-secondary"
        @click="openEditForm(entity)"
      >
        <SvgDisplayer v-if="hasSvg(entity)" :svg="entity.svg" />
        <img
          v-if="hasThumbnail(entity) && isNotNull(entity.thumbnail)"
          :src="entity.thumbnail"
          :alt="`Image de la miniature du projet ${entity.name}`"
          class="object-cover rounded"
        />
        <span class="text-sm">{{ entity.name }}</span>
      </div>
    </li>
    <p v-if="entities.length === 0" class="text-center">Aucune entité créée.</p>
  </ul>
  <Loader v-else />
  <Modal v-if="isDefined(entityToDelete)">
    <div>
      <p>
        Êtes-vous sûr de vouloir supprimer "{{ entityToDelete.name }}" ? Cette
        action est irréversible.
      </p>
      <div class="mt-8 flex justify-center gap-4">
        <button class="cancel-button" @click="closeDeletionModal">
          Annuler
          <i class="fa-solid fa-ban ml-2" />
        </button>
        <button class="danger-button" @click="deleteEntity(entityToDelete)">
          Supprimer
          <i class="fa-solid fa-trash ml-2" />
        </button>
      </div>
    </div>
  </Modal>
  <Snackbar
    v-if="isDefined(errorMessage)"
    type="error"
    :message="errorMessage"
    :buttons="[]"
  />
</template>
