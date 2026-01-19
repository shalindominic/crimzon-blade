import { type QueryParams } from "next-sanity";
import { client } from "./client";

export async function sanityFetch<QueryResponse>({
    query,
    params = {},
}: {
    query: string;
    params?: QueryParams;
}): Promise<QueryResponse> {
    return client.fetch<QueryResponse>(query, params, {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
}
