import { ZodError, type z } from "zod";

export default function useApi() {
  function isFetchError(error: unknown): error is {
    data: { statusMessage: string };
  } {
    return (
      typeof error === "object" &&
      isNotNull(error) &&
      "data" in error &&
      typeof error.data === "object" &&
      isNotNull(error.data) &&
      "statusMessage" in error.data &&
      typeof error.data.statusMessage === "string"
    );
  }

  function handleError(error: unknown) {
    if (isFetchError(error)) {
      return error.data.statusMessage;
    }

    if (error instanceof ZodError) {
      return error.issues
        .map((err) => `[${err.path}] ${err.message}`)
        .join("\n");
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Une erreur inconnue est survenue";
  }

  async function getData<T>(
    endpoint: string,
    zodSchema: z.ZodType<T>
  ): Promise<T> {
    try {
      const response = await $fetch(endpoint);
      return zodSchema.parse(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  async function postOrPutData<T, U>(
    method: "POST" | "PUT",
    endpoint: string,
    rawData: unknown,
    editZodSchema: z.ZodType<U>
  ): Promise<T> {
    try {
      // Use $fetch.raw and cast response to T to avoid excessive TypeScript type inference errors with dynamic endpoints.
      const response = await $fetch.raw(endpoint, {
        method,
        body: JSON.stringify(editZodSchema.parse(rawData))
      });
      return response._data as T;
    } catch (error) {
      throw handleError(error);
    }
  }

  async function deleteData(endpoint: string): Promise<void> {
    try {
      await $fetch(endpoint, {
        method: "DELETE"
      });
    } catch (error) {
      throw handleError(error);
    }
  }
  return { getData, postOrPutData, deleteData };
}
