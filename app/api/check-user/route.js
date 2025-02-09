import { checkUser } from "@/lib/checkUser";

export const GET = async () => {
  try {
    const user = await checkUser();
    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
