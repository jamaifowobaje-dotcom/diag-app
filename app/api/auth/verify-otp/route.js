export async function POST(request) {
  const { otp } = await request.json();
  const otpPattern = /^\d{6}$/;

  if (!otpPattern.test(otp)) {
    return Response.json({ error: "Invalid OTP" }, { status: 400 });
  }

  return Response.json({ success: true }, { status: 200 });
}