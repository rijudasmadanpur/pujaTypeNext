// // lib/api.js

// // Example: fetch post data (revalidate every 60 seconds)
// export async function getPost(id) {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
//     next: { revalidate: 60 }, // cache for 60s
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch post data");
//   }

//   return res.json();
// }

// // Example: fetch all puja (no cache) ================================================
// export async function getAllPuja() {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/getAllPujaTypes`,
//       { next: { revalidate: 1800 } } // cache for 30 minutes
//     );

//     if (!res.ok) {
//       throw new Error(`Failed to fetch: ${res.statusText}`);
//     }

//     const result = await res.json();

//     // Handle both possible shapes
//     if (result && Array.isArray(result.data)) {
//       return result.data;
//     }
//     if (Array.isArray(result)) {
//       return result;
//     }

//     return [];
//   } catch (error) {
//     console.error("Error fetching puja types:", error);
//     return [];
//   }
// }
// // Example: fetch single puja (no cache) ================================================
// export async function getSinglePuja(id) {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/getPujaTypeByID/${id}`,
//       { next: { revalidate: 1800 } } // cache for 30 minutes
//     );

//     if (!res.ok) {
//       throw new Error(`Failed to fetch: ${res.statusText}`);
//     }

//     const result = await res.json();
//     // console.log(result);

//     // Handle both possible shapes
//     if (res.ok) {
//       return result.data;
//     }
//     // if (Array.isArray(result)) {
//     //   return result.data;
//     // }

//     // return [];
//   } catch (error) {
//     console.error("Error fetching puja types:", error);
//     return [];
//   }
// }

// // Example: fetch users (cache forever until redeploy) ======================================
// export async function getUsers() {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
//     cache: "force-cache",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch users");
//   }

//   return res.json();
// }


// // ==============================fetchfn ======================================================
// export async function fetchfn(url: string, revalidate = false) {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL2}/${url}`,
//       { next: { revalidate: revalidate ? 0 : false } }
//     );

//     if (!res.ok) {
//       throw new Error(`Failed to fetch: ${res.statusText}`);
//     }

//     const result = await res.json();

//     // Handle both possible shapes
//     if (result && Array.isArray(result.data)) {
//       return result.data;
//     }
//     if (Array.isArray(result)) {
//       return result;
//     }

//     return [];
//   } catch (error) {
//     console.error("Error fetching languages:", error);
//     return [];
//   }
// }

// // ==============================language ======================================================
// export const getAllLanguages = () => fetchfn("languageMaster");
// // ==============================language ======================================================
// export const getAllCertificates = () => fetchfn("certificates?type=Certification");

// lib/api.ts

// Example: fetch post data (revalidate every 60 seconds)
export async function getPost(id: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 }, // cache for 60s
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post data");
  }

  return res.json();
}

// Example: fetch all puja (cache 30 minutes)
export async function getAllPuja(): Promise<any[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getAllPujaTypes`,
      { next: { revalidate: false } } // cache for 30 minutes
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const result: any = await res.json();

    // Handle both possible shapes
    if (result && Array.isArray(result.data)) {
      return result.data;
    }
    if (Array.isArray(result)) {
      return result;
    }

    return [];
  } catch (error) {
    console.error("Error fetching puja types:", error);
    return [];
  }
}

// Example: fetch single puja (cache 30 minutes)
export async function getSinglePuja(id: number): Promise<any> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getPujaTypeByID/${id}`,
      { next: { revalidate: 1800 } } // cache for 30 minutes
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const result: any = await res.json();

    return result.data ?? [];
  } catch (error) {
    console.error("Error fetching puja types:", error);
    return [];
  }
}

// Example: fetch users (cache forever until redeploy)
export async function getUsers(): Promise<any[]> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

// ==============================fetchfn ======================================================
export async function fetchfn<T = any>(url: string, revalidate = false): Promise<T[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL2}/${url}`,
      { next: { revalidate: revalidate ? 0 : false } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const result: any = await res.json();

    // Handle both possible shapes
    if (result && Array.isArray(result.data)) {
      return result.data;
    }
    if (Array.isArray(result)) {
      return result;
    }

    return [];
  } catch (error) {
    console.error("Error fetching languages:", error);
    return [];
  }
}

// ==============================language ======================================================
export const getAllLanguages = (): Promise<any[]> => fetchfn("languageMaster");
// ==============================certificates ======================================================
export const getAllCertificates = (): Promise<any[]> => fetchfn("certificates?type=Certification");
// ==============================education ======================================================
export const getAllEducation = (): Promise<any[]> => fetchfn("certificates?type=Education");
// ==============================specialization ======================================================
export const getAllSpecialization = (): Promise<any[]> => fetchfn("specializations");