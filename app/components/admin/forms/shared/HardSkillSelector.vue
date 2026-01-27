<script setup lang="ts">
import z from "zod";
import type { HardSkill } from "~~/prisma/generated/client";

const projectExperienceHardSkillIds = defineModel<number[]>({
  required: true
});

const api = useApi();
const hardSkills = await api.getData<HardSkill[]>(
  "/api/hard-skills",
  z.array(hardSkillSchema)
);

const notSelectedHardSkills = computed(() =>
  hardSkills.filter(
    (hardSkill) =>
      !projectExperienceHardSkillIds.value.find(
        (selectedHardSkillId) => selectedHardSkillId === hardSkill.id
      )
  )
);

function findHardSkillById(id: HardSkill["id"]): HardSkill {
  const hardSkill = hardSkills.find((hardSkill) => hardSkill.id === id);

  if (isUndefined(hardSkill)) {
    throw new Error(`Hard skill avec l'id ${id} introuvable`);
  }

  return hardSkill;
}

function addHardSkillId(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const hardSkill = findHardSkillById(Number(selectElement.value));
  projectExperienceHardSkillIds.value = [
    ...projectExperienceHardSkillIds.value,
    hardSkill.id
  ];

  selectElement.value = "";
}

function removeHardSkillId(id: HardSkill["id"]) {
  projectExperienceHardSkillIds.value =
    projectExperienceHardSkillIds.value.filter(
      (hardSkillId) => hardSkillId !== id
    );
}
</script>

<template>
  <label for="hardSkills">Hardskills associés</label>
  <select
    v-if="notSelectedHardSkills.length > 0"
    id="hardSkills"
    @change="addHardSkillId($event)"
  >
    <option value="" disabled selected>Ajouter un hardskill</option>
    <option
      v-for="hardSkill in notSelectedHardSkills"
      :key="hardSkill.id"
      :value="hardSkill.id"
    >
      {{ hardSkill.name }}
    </option>
  </select>

  <ul
    v-if="projectExperienceHardSkillIds.length > 0"
    class="flex flex-wrap gap-4 mt-2"
  >
    <li
      v-for="hardSkillId in projectExperienceHardSkillIds"
      :key="hardSkillId"
      class="flex flex-col items-center"
    >
      <i
        class="fa-solid fa-trash text-false cursor-pointer hover:text-secondary"
        @click="removeHardSkillId(hardSkillId)"
      />
      <SkillDisplayer :skill="findHardSkillById(hardSkillId)" />
    </li>
  </ul>
</template>
