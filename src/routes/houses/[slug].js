import { stringify } from 'qs';
import { currency, createAdaptiveMediaSource, getLocale } from '~/helpers';

import metadataApi from '~/api/MetadataApi';
import propertiesApi from '~/api/PropertiesApi';

const imageFields = { fields: ['formats'] };

export async function get({ request, params }) {
  const locale = request.headers.get('cookie')?.split('=')[1];

  try {
    const res = await Promise.all([
      propertiesApi.fetchProperties('/properties', {
        query: stringify(
          {
            locale: getLocale(locale),
            filters: {
              slug: { $eq: params.slug },
            },
            fields: ['title', 'price', 'slug'],
            populate: {
              image: imageFields,
              video: { fields: ['url', 'mime'] },
              about: { populate: { image: imageFields } },
              stats: '*',
              location: { populate: { media: imageFields } },
              layout: {
                populate: {
                  floors: { populate: { image: imageFields } },
                  spaces: {
                    populate: {
                      icon: { fields: ['url'] },
                      images: imageFields,
                    },
                  },
                },
              },
              features: { populate: { image: imageFields } },
              amenity: {
                populate: { amenities: { populate: { image: imageFields } } },
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
            fields: ['domain', 'appName'],
          },
          { encodeValuesOnly: true }
        ),
      }),
    ]);

    const [property, metadata] = await Promise.all([
      res[0].json(),
      res[1].json(),
    ]);

    if (!property.data.length) {
      return {
        body: {
          message: 'not found',
        },
        status: 404,
      };
    }

    const {
      id,
      attributes: {
        price,
        image,
        video,
        about: { image: aboutImage, ...aboutData },
        location: { media, ...locationData },
        layout,
        amenity: { amenities: $amenities, ...amenityData },
        ...rest
      },
    } = property.data[0];

    const floors = layout.floors.map((floor) => {
      const spaces = layout.spaces
        .filter((space) => space.floor === floor.floor)
        .map(({ icon, images, ...rest }) => {
          return {
            icon: {
              url: icon.data.attributes.url,
            },
            images: images.data.map((image) => ({
              ...createAdaptiveMediaSource(image.attributes.formats),
              thumbnail: image.attributes.formats.thumbnail.url,
            })),
            ...rest,
          };
        });

      return {
        id: floor.id,
        title: floor.title,
        image: createAdaptiveMediaSource(floor.image.data.attributes.formats),
        spaces,
      };
    });

    const amenities = $amenities.map(({ image, ...rest }) => ({
      image: createAdaptiveMediaSource(image.data.attributes.formats),
      ...rest,
    }));

    const $property = {
      id,
      price: currency.format(price),
      image: createAdaptiveMediaSource(image.data.attributes.formats),
      video: {
        url: video.data.attributes.url,
      },
      about: {
        image: createAdaptiveMediaSource(aboutImage.data.attributes.formats),
        ...aboutData,
      },
      location: {
        ...locationData,
        image: createAdaptiveMediaSource(media.data.attributes.formats),
      },
      layout: {
        name: layout.name,
        floors,
      },
      amenity: { ...amenityData, amenities },
      ...rest,
    };

    return {
      body: {
        property: $property,
        metatags: {
          domain: metadata.data.attributes.domain,
          appName: metadata.data.attributes.appName,
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
