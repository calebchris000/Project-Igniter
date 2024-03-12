/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { userId } = params;
  return {
    props: {
      userId,
    },
  };
}
