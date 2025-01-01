import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = "secret"; // This should be stored in an environment variable in production
const key = new TextEncoder().encode(secretKey);

// Encrypt a JWT with payload
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h") // Set expiration to 1 hour
    .sign(key);
}

// Decrypt a JWT and verify its signature
export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"]
  });
  return payload;
}

// Get the current session from the cookie
export async function getSession() {
  const timeoutPromise = new Promise<null>((_, reject) => {
    setTimeout(() => reject(new Error("Timeout exceeded")), 100);
  });

  // Create a session retrieval and decryption promise
  const sessionPromise = (async () => {
    const session = cookies().get("session")?.value;

    if (!session) {
      return null;
    }

    const user = await decrypt(session);
    const { userId, email } = user;
    return { id: userId, email } as { id: string; email: string };
  })();

  try {
    const result = await Promise.race([sessionPromise, timeoutPromise]);
    return result;
  } catch (error: any) {
    if (error.message === "Timeout exceeded") {
      return null;
    }
  }
}
