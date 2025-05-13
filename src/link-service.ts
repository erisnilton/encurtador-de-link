import { create, findOneByFullLink, getLink, update } from "./link-repository.js";

export async function getShortLink(link: string): Promise<string | undefined> {
  const result = await findOneByFullLink(link);
  if (result) {
    return `${process.env.API_URL}/${result.key}`;
  }
}

export async function generateShortLink(link:string): Promise<string> {
  const shortLink = await create(link);
  return `${process.env.API_URL}/${shortLink.key}`;
}

export async function accessLink(id: string): Promise<string | undefined> {
  const link = await getLink(id);

  if (!link) {
    return;
  }
  await update(id, {
    last_access: new Date().toJSON(),
    counter: link.counter + 1,
  });
  return link.value;
}
