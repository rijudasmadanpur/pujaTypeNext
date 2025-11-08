// lib/api.js

// Example: fetch post data (revalidate every 60 seconds)
export async function getPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 }, // cache for 60s
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post data");
  }

  return res.json();
}

// Example: fetch all puja (no cache) ================================================

export async function getAllPuja() {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/getAllPujaTypes`,
  )
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getAllPujaTypes`,
    { cache: "force-cache" }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch puja types: ${res.statusText}`);
  }

  const result = await res.json();

  if (result && Array.isArray(result.data)) {
    return result.data;
  }
  if (Array.isArray(result)) {
    return result;
  }

  return [];
}

// Example: fetch single puja (no cache) ================================================
export async function getSinglePuja(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getPujaTypeByID/${id}`,
      { cache: "force-cache" } // cached until next build or invalidation
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const result = await res.json();
    // console.log(result);

    // Handle both possible shapes
    if (res.ok) {
      return result.data;
    }
    // if (Array.isArray(result)) {
    //   return result.data;
    // }

    // return [];
  } catch (error) {
    console.error("Error fetching puja types:", error);
    return [];
  }
}

// Example: fetch users (cache forever until redeploy) ======================================
export async function getUsers() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

// Example: fetch pandit with location (cache forever until redeploy) ======================================
export async function getPanditLocation(countryCode, stateCode, cityCode) {
  console.log("url", `${process.env.NEXT_PUBLIC_API_URL2}/panditData/location?countryCode=${countryCode}&stateCode=${stateCode}&cityCode=${cityCode}`)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL2}/panditData/location?countryCode=${countryCode}&stateCode=${stateCode}&cityCode=${cityCode}`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch pandit location data");
  }

  return res.json();
}

// pandit ================================================
export async function getPanditById(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL2}/panditData?UsersID=${id}`,
    { cache: "force-cache" }
  );

  console.log("url", `${process.env.NEXT_PUBLIC_API_URL2}/panditData?UsersID=${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch pandit by ID");
  }
  return res.json();
}
// pandit with location and puja ================================================================

export async function getPanditWithPuja(id, countryCode, stateCode, cityCode) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL2}/panditData/location?countryCode=${countryCode}&stateCode=${stateCode}&cityCode=${cityCode}&pujaTypeID=${id}`,
    { cache: "force-cache" }
  );

  console.log("url", `${process.env.NEXT_PUBLIC_API_URL2}/panditData/location?countryCode=${countryCode}&stateCode=${stateCode}&cityCode=${cityCode}&pujaTypeID=${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch pandit by ID");
  }
  return res.json();
}