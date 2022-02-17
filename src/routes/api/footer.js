import { stringify } from 'qs';
import { getLocale } from '~/helpers';
import metadataApi from '~/api/MetadataApi';

export async function get({ request }) {
  const locale = request.headers.get('cookie')?.split('=')[1];

  const res = await metadataApi.fetchFooter('/footer', {
    query: stringify(
      {
        locale: getLocale(locale),
        fields: ['contactDisplayText', 'copy'],
        populate: ['networks'],
      },
      { encodeValuesOnly: true }
    ),
  });

  const { data } = await res.json();

  return {
    body: {
      data: {
        contactDisplayText: data.attributes.contactDisplayText,
        copy: data.attributes.copy,
        networks: data.attributes.networks.map(({ name, link }) => ({
          name,
          link,
        })),
      },
    },
  };
}
