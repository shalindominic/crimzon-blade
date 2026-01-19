import { defineField, defineType } from 'sanity'

export const claimCode = defineType({
    name: 'claimCode',
    title: 'Claim Code',
    type: 'document',
    fields: [
        defineField({
            name: 'code',
            title: 'Verification Code',
            type: 'string',
            validation: (rule) => rule.required().min(8).max(20),
            description: 'The unique code found on the physical item (formatted XXXX-XXXX)',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Active (Unclaimed)', value: 'active' },
                    { title: 'Claimed', value: 'claimed' },
                    { title: 'Revoked', value: 'revoked' },
                ],
                layout: 'radio',
            },
            initialValue: 'active',
        }),
        defineField({
            name: 'product',
            title: 'Associated Product',
            type: 'reference',
            to: [{ type: 'product' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'edition',
            title: 'Edition Number',
            type: 'number',
            description: 'Which specific edition is this? (e.g. 5 for "5 of 50")',
        }),
        defineField({
            name: 'claimedBy',
            title: 'Claimed By (User ID)',
            type: 'string',
            readOnly: true,
            description: 'Clerk User ID of the owner. Automatically filled upon claim.',
        }),
        defineField({
            name: 'claimedAt',
            title: 'Claimed At',
            type: 'datetime',
            readOnly: true,
        }),
    ],
    preview: {
        select: {
            title: 'code',
            subtitle: 'status',
            edition: 'edition',
            product: 'product.name',
        },
        prepare({ title, subtitle, edition, product }) {
            return {
                title: title,
                subtitle: `${subtitle.toUpperCase()} // ${product} #${edition || '?'}`,
            }
        },
    },
})
