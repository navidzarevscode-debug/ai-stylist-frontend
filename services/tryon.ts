const API_URL = "https://app-python-7nqup.apps.de1.abrhapaas.com/tryon/";
const OUTFIT_API_URL = "https://app-python-7nqup.apps.de1.abrhapaas.com/tryon/outfit";

export async function tryOnProduct(productId: number, personImage: File): Promise<string> {
  const formData = new FormData();
  formData.append("product_id", String(productId));
  formData.append("person_image", personImage);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("خطا در ساخت تصویر");
  }

  const data = await response.json();
  return data.result_image_url as string;
}

export async function tryOnOutfit(
  productIds: number[],
  personImage: File
): Promise<string> {
  const formData = new FormData();
  productIds.forEach((id) => formData.append("product_ids", String(id)));
  formData.append("person_image", personImage);

  const response = await fetch(OUTFIT_API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("خطا در ساخت تصویر");
  }

  const data = await response.json();
  return data.result_image_url as string;
}