export async function get({ params }) {
  // `params.id` comes from [id].js
  console.log(params.slug);

  return {
    body: { slug: params.slug },
  };

  // return {
  //   status: 404,
  // };
}
