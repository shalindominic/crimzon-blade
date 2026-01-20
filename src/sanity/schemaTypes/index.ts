import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { drop } from './drop'
import { lore } from './lore'
import { order } from './order'
import { unlockCode } from './unlockCode'
import { userUnlock } from './userUnlock'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [product, drop, lore, order, unlockCode, userUnlock],
}
