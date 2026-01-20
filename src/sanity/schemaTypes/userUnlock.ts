import { defineField, defineType } from 'sanity'

export const userUnlock = defineType({
    name: 'userUnlock',
    title: 'User Unlock',
    type: 'document',
    fields: [
        defineField({
            name: 'userId',
            title: 'User ID (Clerk)',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'itemId',
            title: 'Item/Drop ID',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'unlockedAt',
            title: 'Unlocked At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'source',
            title: 'Unlock Source',
            type: 'string',
            options: {
                list: [
                    { title: 'Code Redemption', value: 'code' },
                    { title: 'Admin Grant', value: 'admin' },
                    { title: 'Purchase', value: 'purchase' },
                ],
            },
            initialValue: 'code',
        }),
    ],
    preview: {
        select: {
            title: 'itemId',
            subtitle: 'userId',
        },
        prepare({ title, subtitle }) {
            return {
                title: `Unlock: ${title}`,
                subtitle: `User: ${subtitle}`,
            }
        },
    },
})
