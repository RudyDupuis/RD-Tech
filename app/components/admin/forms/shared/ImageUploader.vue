<script setup lang="ts">
const images = defineModel<string | string[] | null>({ required: true });

interface Props {
  label: string;
  multiple?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false
});

const { validateImageFile, fileToBase64 } = useFileUpload();
const errorMessage = ref<string | undefined>(undefined);

const currentImages = ref<string[]>(
  Array.isArray(images.value)
    ? images.value
    : isNull(images.value)
      ? []
      : [images.value]
);

async function handleUpload(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (isNull(files) || files.length === 0) {
    return;
  }

  for (const file of files) {
    if (!validateImageFile(file)) {
      return (errorMessage.value =
        "Veuillez sélectionner des images valides de moins de 5 Mo.");
    }
  }

  try {
    const newImages: string[] = [];

    for (const file of files) {
      newImages.push(await fileToBase64(file));
    }

    if (props.multiple && Array.isArray(images.value)) {
      currentImages.value = [...images.value, ...newImages];
      images.value = [...images.value, ...newImages];
    } else {
      currentImages.value = newImages;
      images.value = newImages[0] || null;
    }
  } catch (error) {
    errorMessage.value = String(error);
  }
}

function removeImage(image: string) {
  currentImages.value = currentImages.value.filter((img) => img !== image);
  if (props.multiple && Array.isArray(images.value)) {
    images.value = images.value.filter((img) => img !== image);
  } else {
    images.value = null;
  }
}
</script>

<template>
  <label for="image">{{ props.label }}</label>
  <div
    v-if="currentImages.length"
    class="flex flex-wrap items-center justify-center gap-4"
  >
    <div v-for="(image, i) in currentImages" :key="i" class="relative">
      <i
        class="absolute top-2 right-3 fa-solid fa-trash text-false cursor-pointer hover:text-secondary"
        @click="removeImage(image)"
      />
      <img
        :src="image"
        :alt="`Image ${i + 1}`"
        class="w-48 object-cover rounded"
      />
    </div>
  </div>
  <input
    id="image"
    type="file"
    accept="image/png"
    :multiple="multiple"
    @change="handleUpload"
  />

  <Snackbar
    v-if="isDefined(errorMessage)"
    type="error"
    :message="errorMessage"
    :buttons="[]"
  />
</template>
