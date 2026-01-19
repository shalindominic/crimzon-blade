import { defineField, defineType } from 'sanity'

export const product = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'rarity',
            title: 'Rarity',
            type: 'string',
            options: {
                list: [
                    { title: 'Legendary', value: 'Legendary' },
                    { title: 'Epic', value: 'Epic' },
                    { title: 'Rare', value: 'Rare' },
                    { title: 'Uncommon', value: 'Uncommon' },
                    { title: 'Common', value: 'Common' },
                ],
                layout: 'radio'
            }
        }),
        defineField({
            name: 'edition',
            title: 'Edition String',
            type: 'string',
            description: 'e.g. 87/300 or Unlimited'
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Product Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'lore',
            title: 'Lore Text',
            type: 'text',
        }),
        defineField({
            name: 'sizes',
            title: 'Sizes',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'S', value: 'S' },
                    { title: 'M', value: 'M' },
                    { title: 'L', value: 'L' },
                    { title: 'XL', value: 'XL' },
                    { title: 'XXL', value: 'XXL' },
                ]
            }
        }),
        defineField({
            name: 'contents',
            title: 'Package Contents',
            type: 'array',
            of: [{ type: 'string' }]
        }),
    ],
})
