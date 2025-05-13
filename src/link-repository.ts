import knexConfig from "../knexfile.js";
import knexInit from "knex";
import shortid from "shortid";

export interface LinkModel {
  key: string;
  value: string;
  counter: number;
  last_access: string;
  created_at: string;
}

const knex = knexInit(knexConfig);

export async function getLink(key: string): Promise<LinkModel | undefined> {
  return await knex("link").where({ key }).first();
}

export async function findOneByFullLink(
  link: string
): Promise<LinkModel | undefined> {
  return await knex("link").where({ value: link }).first();
}

export async function create(link: string): Promise<LinkModel> {
  const shortId = shortid.generate();
  return await knex("link")
    .insert({
      key: shortId,
      value: new URL(link).toString(),
    })
    .returning("*")
    .then((data) => data[0]);
}

export async function update(
  id: string,
  data: Partial<Omit<LinkModel, "key">>
) {
  await knex("link").update(data).where({ key: id });
}
