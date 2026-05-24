import { store } from "@/lib/store";

export async function PUT(request) {
  const { userId, name, role, teamSize } = await request.json();
  const user = store.users[userId];

  if (!userId || !user) {
    return Response.json({ error: "User not found" }, { status: 400 });
  }

  if (!name || !role) {
    return Response.json(
      { error: "Name and role are required" },
      { status: 400 }
    );
  }

  store.users[userId] = {
    ...user,
    name,
    role,
    teamSize,
  };

  return Response.json({ success: true }, { status: 200 });
}