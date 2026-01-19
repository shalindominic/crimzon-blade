import { defineField, defineType } from 'sanity'

export const drop = defineType({
    name: 'drop',
    title: 'Drop',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Drop Title',
            type: 'string',
        }),
        defineField({
            name: 'dropDate',
            title: 'Drop Date (Zero Hour)',
            type: 'datetime'
        }),
        defineField({
            name: 'silhouetteImage',
            title: 'Silhouette/Teaser Image',
            type: 'image',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: ['Announced', 'Live', 'Ended', 'Classified'],
                layout: 'radio'
            }
        })
    ],
})
