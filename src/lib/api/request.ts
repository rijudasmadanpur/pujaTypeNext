
export default function request(url: string, options: RequestInit): Promise<Response> {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, options);
}
