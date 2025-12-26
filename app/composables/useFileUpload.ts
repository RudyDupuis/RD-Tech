export default function useFileUpload() {
  function validateSvgFile(file: File): boolean {
    return file.type === "image/svg+xml" || file.name.endsWith(".svg");
  }
  function validateImageFile(file: File): boolean {
    const validTypes = ["image/png"];
    if (file.size > 5 * 1024 * 1024) {
      return false;
    }
    return validTypes.includes(file.type) || /\.png$/i.test(file.name);
  }

  async function convertSvgToString(file: File): Promise<string> {
    const text = await file.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");

    const svg = doc.querySelector("svg");
    if (
      isNull(svg) ||
      /<script|on\w+=/i.test(text) // Simple XSS check
    ) {
      throw new Error("SVG invalide");
    }

    const viewBox = svg.getAttribute("viewBox");
    if (viewBox !== "0 0 80 80") {
      throw new Error("Le SVG doit avoir un viewBox de 0 0 80 80");
    }

    return svg.innerHTML.replace(/\s+fill="[^"]*"/gi, "");
  }

  async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () =>
        reject(new Error("Erreur lors de la lecture du fichier"));
      reader.readAsDataURL(file);
    });
  }

  return {
    validateSvgFile,
    validateImageFile,
    convertSvgToString,
    fileToBase64
  };
}
