import { defineField, defineType } from 'sanity'

export const lore = defineType({
    name: 'lore',
    title: 'Lore Entry',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Visual',
            type: 'image',
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number'
        })
    ],
})
