import { store } from "@/lib/store";

export async function GET(request, context) {
  const { id } = await context.params;
  
  const user = store.users[id];

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const { passwordHash, ...safeUser } = user;
  return Response.json(safeUser, { status: 200 });
}