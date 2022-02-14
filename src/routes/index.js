import { stringify } from 'qs';
import { currency, createAdaptiveMediaSource } from '~/helpers';

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
    console.log(process.env.API_BASE_URL);
    const res = await fetch(`${process.env.API_BASE_URL}/properties?${query}`);
    const { data } = await res.json();

    const properties = data.map(({ id, attributes }) => {
      const { image, price, ...rest } = attributes;
      return {
        id,
        price: currency.format(price),
        image: createAdaptiveMediaSource(image.data.attributes.formats),
        ...rest,
      };
    });

    return {
      body: {
        properties,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: { error },
    };
  }
}
