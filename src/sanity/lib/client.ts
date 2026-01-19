import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
})

export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Never use CDN for writes
    token: process.env.SANITY_API_TOKEN,
})
