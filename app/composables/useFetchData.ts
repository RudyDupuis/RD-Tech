import type z from "zod";

export function useFetchData<T>(endpoint: string, zodSchema: z.ZodType<T>) {
  const data = ref<T | undefined>(undefined);
  const isLoading = ref<boolean>(false);

  const api = useApi();

  async function fetchData() {
    isLoading.value = true;
    try {
      data.value = await api.getData<T>(endpoint, zodSchema);
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  fetchData();

  return { data, isLoading };
}
