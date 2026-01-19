import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { drop } from './drop'
import { lore } from './lore'
import { claimCode } from './claimCode'
import { order } from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [product, drop, lore, claimCode, order],
}
