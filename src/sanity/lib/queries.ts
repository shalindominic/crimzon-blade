import { groq } from "next-sanity";

export const ALL_PRODUCTS_QUERY = groq`*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  rarity,
  edition,
  price,
  "imageUrl": image.asset->url,
  description
}`;

export const PRODUCT_BY_ID_QUERY = groq`*[_type == "product" && _id == $id][0] {
  _id,
  name,
  "slug": slug.current,
  rarity,
  edition,
  price,
  "imageUrl": image.asset->url,
  description,
  lore,
  sizes,
  contents
}`;

export const ALL_DROPS_QUERY = groq`*[_type == "drop"] | order(dropDate asc) {
  _id,
  title,
  dropDate,
  "imageUrl": silhouetteImage.asset->url,
  status
}`;

export const ALL_LORE_QUERY = groq`*[_type == "lore"] | order(order asc) {
  _id,
  title,
  content,
  "imageUrl": image.asset->url
}`;

export const VAULT_ITEMS_QUERY = groq`*[_type == "product"] | order(rarity desc) {
  _id,
  name,
  rarity,
  "imageUrl": image.asset->url
}`;
