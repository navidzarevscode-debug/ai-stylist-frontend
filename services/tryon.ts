const BASE_URL = "https://app-python-xvxv0.apps.frk1.abrhapaas.com";

const API_URL = `${BASE_URL}/tryon/`;
const OUTFIT_API_URL = `${BASE_URL}/tryon/outfit`;

async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();

    if (typeof data?.detail === "string") {
      return data.detail;
    }
  } catch {
    // پاسخ JSON نبود
  }

  return "خطا در ساخت تصویر";
}

function normalizeImageUrl(url: string): string {
  if (!url) {
    throw new Error("آدرس تصویر از بک‌اند دریافت نشد");
  }

  // اگر بک‌اند URL کامل برگرداند
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // اگر بک‌اند مسیر نسبی برگرداند
  if (url.startsWith("/")) {
    return `${BASE_URL}${url}`;
  }

  // اگر فقط path بدون / برگرداند
  return `${BASE_URL}/${url}`;
}

export async function tryOnProduct(
  productId: number,
  personImage: File
): Promise<string> {
  const formData = new FormData();

  formData.append("product_id", String(productId));
  formData.append("person_image", personImage);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response));
  }

  const data = await response.json();

  console.log("Try-on response:", data);

  return normalizeImageUrl(data.result_image_url);
}

export async function tryOnOutfit(
  productIds: number[],
  personImage: File
): Promise<string> {
  const formData = new FormData();

  productIds.forEach((id) => {
    formData.append("product_ids", String(id));
  });

  formData.append("person_image", personImage);

  const response = await fetch(OUTFIT_API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response));
  }

  const data = await response.json();

  console.log("Outfit response:", data);

  return normalizeImageUrl(data.result_image_url);
}