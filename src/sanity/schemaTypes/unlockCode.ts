import { defineField, defineType } from 'sanity'

export const unlockCode = defineType({
    name: 'unlockCode',
    title: 'Unlock Code',
    type: 'document',
    fields: [
        defineField({
            name: 'code',
            title: 'Code',
            type: 'string',
            validation: (rule) => rule.required(),
            description: 'The unique code found on physical merchandise (e.g. CB-BLADE-777)',
        }),
        defineField({
            name: 'drop',
            title: 'Drop ID',
            type: 'string',
            validation: (rule) => rule.required(),
            description: 'The ID of the drop this code unlocks (e.g. crimezon-initiate)',
        }),
        defineField({
            name: 'used',
            title: 'Used',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'usedBy',
            title: 'Used By (User ID)',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'usedAt',
            title: 'Used At',
            type: 'datetime',
            readOnly: true,
        }),
    ],
    preview: {
        select: {
            title: 'code',
            subtitle: 'drop',
            used: 'used',
        },
        prepare({ title, subtitle, used }) {
            return {
                title: title,
                subtitle: `${subtitle} | ${used ? 'USED' : 'ACTIVE'}`,
            }
        },
    },
})
