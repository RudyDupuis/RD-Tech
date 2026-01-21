import { onUnmounted, ref } from "vue";

const SMALL_SCREEN_SIZE_LIMIT = 768;

export default function useIsSmallScreen() {
  const isSmallScreen = ref<boolean | undefined>(undefined);

  function updateIsSmallScreen() {
    isSmallScreen.value = window.innerWidth <= SMALL_SCREEN_SIZE_LIMIT;
  }

  onMounted(() => {
    updateIsSmallScreen();
    window.addEventListener("resize", updateIsSmallScreen);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateIsSmallScreen);
  });

  return isSmallScreen;
}
