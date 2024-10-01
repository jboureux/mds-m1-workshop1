import z from "zod";

const methods = z.enum(["GET", "POST", "PATCH", "PUT", "DELETE"]);
const allowedContentTypes = z.enum(["application/json"]);

export async function fetchFromAPI<T>(
    route: string,
    method: z.infer<typeof methods>,
    body?: unknown,
    options?: {
        headers?: {
            contentType?: z.infer<typeof allowedContentTypes>;
        };
    }
): Promise<{ data?: T; error?: Error }> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${route}`, {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: {
            "Content-Type":
                options && options.headers && options.headers?.contentType
                    ? options.headers.contentType
                    : "application/json",
        },
        cache: "no-store",
    });

    const responseData = await response.json();

    const result: { data?: T; error?: Error } = {};
    if (response.ok) {
        result.data = responseData;
    } else {
        result.error = responseData.message;
    }
    return result;
}
