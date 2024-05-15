import prisma from "@/lib/prisma";

export async function logAction(
  userId: string | null,
  role: string | null,
  action: string,
  notes?: string
) {
  await prisma.log.create({
    data: {
      userId,
      role,
      action,
      notes,
    },
  });
}

export async function getLog() {
  try {
    const log = await prisma.log.findMany();
    return log;
  } catch (error: any) {
    throw new Error(`Failed to fetch log: ${error.message}`);
  }
}
