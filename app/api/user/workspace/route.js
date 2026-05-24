import { store } from "@/lib/store";

export async function PUT(request) {
  const { userId, workspaceName } = await request.json();
  const user = store.users[userId];

  if (!userId || !user) {
    return Response.json({ error: "User not found" }, { status: 400 });
  }

  if (!workspaceName) {
    return Response.json(
      { error: "Workspace name is required" },
      { status: 400 }
    );
  }

  store.users[userId] = {
    ...user,
    workspaceName,
  };

  return Response.json({ success: true }, { status: 200 });
}