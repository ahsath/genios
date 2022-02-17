import { stringify } from 'qs';
import { currency, createAdaptiveMediaSource, getLocale } from '~/helpers';

import metadataApi from '~/api/MetadataApi';
import propertiesApi from '~/api/PropertiesApi';

export async function get({ request }) {
  const locale = request.headers.get('cookie')?.split('=')[1];

  try {
    const res = await Promise.all([
      propertiesApi.fetchProperties('/properties', {
        query: stringify(
          {
            locale: getLocale(locale),
            fields: ['title', 'locality', 'price', 'slug', 'linkDisplayText'],
            populate: {
              image: {
                fields: ['formats'],
              },
            },
          },
          { encodeValuesOnly: true }
        ),
      }),
      metadataApi.fetchMetadata('/metadata', {
        query: stringify(
          {
            locale: getLocale(locale),
            fields: ['domain', 'title', 'description', 'appName'],
            populate: { ogImage: { fields: ['url'] } },
          },
          { encodeValuesOnly: true }
        ),
      }),
    ]);

    const [properties, metadata] = await Promise.all([
      res[0].json(),
      res[1].json(),
    ]);

    return {
      body: {
        properties: properties.data.map(({ id, attributes }) => {
          const { image, price, ...rest } = attributes;
          return {
            id,
            price: currency.format(price),
            image: createAdaptiveMediaSource(image.data.attributes.formats),
            ...rest,
          };
        }),
        metatags: {
          domain: metadata.data.attributes.domain,
          title: metadata.data.attributes.title,
          description: metadata.data.attributes.description,
          appName: metadata.data.attributes.appName,
          ogImage: metadata.data.attributes.ogImage.data.attributes.url,
        },
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: { error },
    };
  }
}
