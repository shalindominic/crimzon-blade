import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2024-01-18',
})

async function createTestData() {
    console.log('--- SEEDING TEST DATA ---')

    if (!process.env.SANITY_API_TOKEN) {
        console.error('ERROR: SANITY_API_TOKEN is missing from .env.local')
        process.exit(1)
    }

    // 1. Create a Test Product
    const product = await client.create({
        _type: 'product',
        name: 'PROTOTYPE X-1',
        slug: { _type: 'slug', current: 'prototype-x-1' },
        price: 0,
        rarity: 'LEGENDARY',
        edition: '1 of 1',
        description: 'A test artifact for system verification.',
        status: 'hidden'
    })

    console.log(`✅ Created Product: ${product.name} (${product._id})`)

    // 2. Create a Claim Code for it
    const codeValue = 'CRIMZON-TEST-2026'

    const claimCode = await client.create({
        _type: 'claimCode',
        code: codeValue,
        product: { _type: 'reference', _ref: product._id },
        edition: 1,
        status: 'active'
    })

    console.log(`✅ Created Code: ${claimCode.code}`)
    console.log('-----------------------------------')
    console.log('YOU CAN NOW CLAIM THIS CODE IN THE APP.')
}

createTestData().catch((err) => {
    console.error('Seed failed:', err.message)
})
