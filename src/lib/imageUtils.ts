// Real browser-side image processing using Canvas API

export interface ProcessResult {
  blob: Blob;
  url: string;
  originalSize: number;
  processedSize: number;
  width: number;
  height: number;
  mimeType: string;
}

export type OutputFormat = "image/jpeg" | "image/png" | "image/webp" | "image/gif" | "image/bmp";

const FORMAT_MAP: Record<string, OutputFormat> = {
  JPEG: "image/jpeg",
  JPG: "image/jpeg",
  PNG: "image/png",
  WEBP: "image/webp",
  GIF: "image/gif",
  BMP: "image/bmp",
};

const FORMAT_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/bmp": "bmp",
};

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => { resolve(img); };
    img.onerror = reject;
    img.src = url;
  });
}

export async function compressImage(file: File, quality: number): Promise<ProcessResult> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  const mimeType: OutputFormat = (file.type as OutputFormat) || "image/jpeg";
  const q = quality / 100;

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob!);
      resolve({
        blob: blob!,
        url,
        originalSize: file.size,
        processedSize: blob!.size,
        width: img.naturalWidth,
        height: img.naturalHeight,
        mimeType,
      });
    }, mimeType, q);
  });
}

export async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  quality: number = 90
): Promise<ProcessResult> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  const mimeType: OutputFormat = (file.type as OutputFormat) || "image/jpeg";
  const q = quality / 100;

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob!);
      resolve({
        blob: blob!,
        url,
        originalSize: file.size,
        processedSize: blob!.size,
        width: targetWidth,
        height: targetHeight,
        mimeType,
      });
    }, mimeType, q);
  });
}

export async function convertImage(
  file: File,
  outputFormat: string,
  quality: number = 90
): Promise<ProcessResult> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;

  // For PNG/transparent formats, fill white background
  if (outputFormat === "image/jpeg" || outputFormat === "image/bmp") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0);

  const mimeType: OutputFormat = FORMAT_MAP[outputFormat] || (outputFormat as OutputFormat);
  const q = mimeType === "image/png" ? undefined : quality / 100;

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob!);
      resolve({
        blob: blob!,
        url,
        originalSize: file.size,
        processedSize: blob!.size,
        width: img.naturalWidth,
        height: img.naturalHeight,
        mimeType,
      });
    }, mimeType, q);
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function getOutputFilename(originalName: string, mimeType: string, suffix: string = "processed"): string {
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
  const ext = FORMAT_EXT[mimeType] || "jpg";
  return `${nameWithoutExt}-${suffix}.${ext}`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export function getSavingsPercent(original: number, processed: number): number {
  if (original === 0) return 0;
  return Math.round(((original - processed) / original) * 100);
}

export { FORMAT_MAP, FORMAT_EXT };
