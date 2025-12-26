import type z from "zod";
import { ZodError } from "zod";

export function apiHandleError(error: unknown) {
  if (error instanceof ZodError) {
    return createError({
      statusCode: 400,
      statusMessage: error.issues.map((err) => err.message).join("\n")
    });
  }

  return createError({
    statusCode: 500,
    statusMessage: String(error)
  });
}

export async function findMany<T, Args>(
  model: { findMany: (args?: Args) => Promise<T[]> },
  args?: Args
): Promise<T[]> {
  try {
    return await model.findMany(args);
  } catch (error) {
    throw apiHandleError(error);
  }
}

export async function findUniqueById<T, Args extends { where: { id: number } }>(
  model: { findUnique: (args: Args) => Promise<T | null> },
  id: number,
  args?: Omit<Args, "where">
): Promise<T | null> {
  try {
    return await model.findUnique({
      ...args,
      where: { id }
    } as Args);
  } catch (error) {
    throw apiHandleError(error);
  }
}

export async function create<T, D, R = D>(
  model: {
    create: (args: { data: R }) => Promise<T>;
  },
  schema: z.ZodSchema<D>,
  rawData: unknown,
  transform?: (validated: D) => R
): Promise<T> {
  try {
    const data = schema.parse(rawData);
    const finalData = isDefined(transform)
      ? transform(data)
      : (data as unknown as R);
    return await model.create({ data: finalData });
  } catch (error) {
    throw apiHandleError(error);
  }
}

export async function updateById<T, D, R = D>(
  model: {
    update: (args: { where: { id: number }; data: R }) => Promise<T>;
  },
  schema: z.ZodSchema<D>,
  id: number,
  rawData: unknown,
  transform?: (validated: D) => R
): Promise<T> {
  try {
    const data = schema.parse(rawData);
    const finalData = isDefined(transform)
      ? transform(data)
      : (data as unknown as R);
    return await model.update({ where: { id }, data: finalData });
  } catch (error) {
    throw apiHandleError(error);
  }
}

export async function deleteById<T>(
  model: {
    delete: (args: { where: { id: number } }) => Promise<T>;
  },
  id: number
): Promise<T> {
  try {
    return await model.delete({ where: { id } });
  } catch (error) {
    throw apiHandleError(error);
  }
}
