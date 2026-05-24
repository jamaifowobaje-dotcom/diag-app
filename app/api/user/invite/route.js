import { store } from "@/lib/store";

export async function POST(request) {
  const { userId, inviteEmails } = await request.json();
  const user = store.users[userId];

  if (!userId || !user) {
    return Response.json({ error: "User not found" }, { status: 400 });
  }

  if (!Array.isArray(inviteEmails)) {
    return Response.json(
      { error: "inviteEmails must be an array" },
      { status: 400 }
    );
  }

  store.users[userId] = {
    ...user,
    inviteEmails,
  };

  return Response.json({ success: true }, { status: 200 });
}