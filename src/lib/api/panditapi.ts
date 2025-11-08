import request from "./request";

// post pandit =============================================================
export async function postPandit(data: any) {
    const res = await request("/pandit/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return await res.json();
}
