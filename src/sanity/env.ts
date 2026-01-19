export const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-18'

export const dataset = assertValue(
    process.env.NEXT_PUBLIC_SANITY_DATASET,
    'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    // Debug log to help troubleshooting in Vercel logs
    if (v === undefined || v === '') {
        console.error(`[Sanity Config] Validation Failed: ${errorMessage}`);
        throw new Error(errorMessage)
    }

    // Log success (masking the value for security)
    if (typeof v === 'string') {
        const masked = v.length > 4 ? `${v.substring(0, 2)}...` : '***';
        console.log(`[Sanity Config] Loaded: ${(errorMessage.split(': ')[1] || 'Var')} = ${masked}`);
    }

    return v
}
