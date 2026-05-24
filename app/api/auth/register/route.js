import { store } from "@/lib/store";

export async function POST(request) {
  const { email, password } = await request.json();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    return Response.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  if (!emailPattern.test(email)) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const passwordHash = Buffer.from(password).toString("base64");

  store.users[id] = {
    id,
    email,
    passwordHash,
    name: "",
    role: "",
    teamSize: "",
    workspaceName: "",
    inviteEmails: [],
    focus: "",
  };

  return Response.json({ userId: id }, { status: 201 });
}