<script setup lang="ts">
const svg = defineModel<string>({ required: true });

const { convertSvgToString, validateSvgFile } = useFileUpload();
const errorMessage = ref<string | undefined>(undefined);

const currentSvg = ref<string>(svg.value);

async function handleSvgUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (isUndefined(file)) {
    return;
  }

  if (!validateSvgFile(file)) {
    return (errorMessage.value = "Veuillez sélectionner un fichier SVG valide");
  }

  try {
    const svgString = await convertSvgToString(file);
    svg.value = svgString;
    currentSvg.value = svgString;
  } catch (error) {
    errorMessage.value = String(error);
  }
}
</script>

<template>
  <label for="svg">SVG</label>
  <div v-if="currentSvg" class="flex items-center justify-center gap-4">
    <SvgDisplayer :svg="currentSvg" class="fill-primary" />
    <SvgDisplayer :svg="currentSvg" class="fill-secondary" />
    <SvgDisplayer :svg="currentSvg" class="fill-dark" />
  </div>
  <input id="svg" type="file" accept=".svg" @change="handleSvgUpload" />

  <Snackbar
    v-if="isDefined(errorMessage)"
    type="error"
    :message="errorMessage"
    :buttons="[]"
  />
</template>
