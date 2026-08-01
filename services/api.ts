export const API_URL = "https://app-python-xvxv0.apps.frk1.abrhapaas.com";

function buildInternalUrl(path: string) {
  return `${API_URL}${path}`;
}

export async function getProducts(filters?: {
  category?: string;
  occasion?: string;
  season?: string;
  search?: string;
}) {
  // اگه جستجو داشته باشیم، از اندپوینت اختصاصی جستجو استفاده می‌کنیم
  if (filters?.search && filters.search.trim().length > 0) {
    const params = new URLSearchParams();
    params.set("query", filters.search.trim());

    const url = `${buildInternalUrl("/products/search")}?${params.toString()}`;
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("خطا در جستجوی محصولات");
    }

    return response.json();
  }

  const params = new URLSearchParams();

  if (filters?.category) params.set("category", filters.category);
  if (filters?.occasion) params.set("occasion", filters.occasion);
  if (filters?.season) params.set("season", filters.season);

  const query = params.toString();
  const url = query ? `${buildInternalUrl("/products/")}?${query}` : buildInternalUrl("/products/");

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("خطا در دریافت محصولات");
  }

  return response.json();
}

export async function getProduct(id: string | number) {
  const url = buildInternalUrl(`/products/${id}`);
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("خطا در دریافت محصول");
  }

  return response.json();
}

export function getImageUrl(path?: string) {
  if (!path) return undefined;
  return `${API_URL}${path}`;
}