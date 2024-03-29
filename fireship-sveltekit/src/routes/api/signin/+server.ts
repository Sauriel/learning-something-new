import { adminAuth } from "$lib/server/admin";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { idToken } = await request.json();
  const expiresIn = 5 * 24 * 60 * 60 * 1000; // 5 days
  const decodeIdToken = await adminAuth.verifyIdToken(idToken);

  if (new Date().getTime() / 1000 - decodeIdToken.auth_time < 5 * 60) {
    const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      path: "/",
    };
    cookies.set("__session", cookie, options);
    return json({ status: "signedIn" });
  } else {
    throw error(401, "Recent sign-in required");
  }
};

export const DELETE: RequestHandler = async ({ request, cookies }) => {
  cookies.delete("__session", { path: "/" });
  return json({ status: "signedOut" });
};
