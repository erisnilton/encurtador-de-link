import { create, findOneByFullLink, getLink, LinkModel, update } from "./link-repository.js";

export async function getShortLink(link: string): Promise<Partial<LinkModel> | undefined> {
  const result = await findOneByFullLink(link);
  if (result) {
    return {
      key: `${process.env.API_URL}/${result.key}`,
      counter: result.counter,
    }
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
