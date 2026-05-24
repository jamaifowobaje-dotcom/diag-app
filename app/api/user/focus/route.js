import { store } from "@/lib/store";

export async function PUT(request) {
  const { userId, focus } = await request.json();
  const user = store.users[userId];

  if (!userId || !user) {
    return Response.json({ error: "User not found" }, { status: 400 });
  }

  if (!focus) {
    return Response.json({ error: "Focus is required" }, { status: 400 });
  }

  store.users[userId] = {
    ...user,
    focus,
  };

  return Response.json({ success: true }, { status: 200 });
}