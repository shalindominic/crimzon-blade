import { defineField, defineType } from 'sanity'

export const order = defineType({
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        defineField({
            name: 'orderNumber',
            title: 'Order Number',
            type: 'string',
            validation: (rule) => rule.required(),
            readOnly: true,
        }),
        defineField({
            name: 'stripePaymentId',
            title: 'Stripe Payment Agent ID',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'customer',
            title: 'Customer Details',
            type: 'object',
            fields: [
                { name: 'name', type: 'string' },
                { name: 'email', type: 'string' },
                { name: 'clerkId', type: 'string' },
            ],
        }),
        defineField({
            name: 'items',
            title: 'Acquired Artifacts',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string' },
                        { name: 'quantity', type: 'number' },
                        { name: 'price', type: 'number' },
                        { name: 'size', type: 'string' },
                        { name: 'product', type: 'reference', to: [{ type: 'product' }] },
                    ],
                },
            ],
        }),
        defineField({
            name: 'amount',
            title: 'Total Amount',
            type: 'number',
        }),
        defineField({
            name: 'status',
            title: 'Ritual Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Paid (Ritual Complete)', value: 'paid' },
                    { title: 'Shipped (Dispatched)', value: 'shipped' },
                ],
                layout: 'radio',
            },
            initialValue: 'pending',
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        })
    ],
    preview: {
        select: {
            title: 'orderNumber',
            subtitle: 'status',
            amount: 'amount',
        },
        prepare({ title, subtitle, amount }) {
            return {
                title: `ORD: ${title}`,
                subtitle: `${subtitle.toUpperCase()} // $${amount}`,
            }
        },
    },
})
