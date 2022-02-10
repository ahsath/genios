import { stringify } from 'qs';

export async function get() {
  const query = stringify(
    {
      locale: 'en',
      fields: ['title', 'locality', 'price', 'slug'],
      populate: {
        image: {
          fields: ['formats'],
        },
      },
    },
    { encodeValuesOnly: true }
  );

  try {
    const { data } = await (
      await fetch(`http://localhost:1337/api/properties?${query}`)
    ).json();

    return {
      body: {
        properties: data,
      },
    };
  } catch (error) {
    // console.log(error);
    return {
      status: 500,
    };
  }
}
