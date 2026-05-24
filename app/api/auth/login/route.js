import { store } from "@/lib/store";

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return Response.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const user = Object.values(store.users).find(
    (storedUser) => storedUser.email === email
  );

  if (!user) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const passwordHash = Buffer.from(password).toString("base64");

  if (passwordHash !== user.passwordHash) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  return Response.json({ userId: user.id }, { status: 200 });
}