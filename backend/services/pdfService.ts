import PDFParser from "pdf2json";

export async function processFile(file: Express.Multer.File): Promise<string> {
  try {
    if (file.mimetype === "application/pdf") {
      // For PDFs, use pdf2json
      const pdfParser = new PDFParser();

      return new Promise((resolve, reject) => {
        pdfParser.on("pdfParser_dataReady", (pdfData) => {
          try {
            const text = decodeURIComponent(
              pdfData.Pages.map((page) =>
                page.Texts.map((text) => text.R.map((r) => r.T).join(" ")).join(
                  " "
                )
              ).join("\n")
            );
            resolve(text || "No text could be extracted from PDF");
          } catch (err) {
            // If parsing fails, fallback to base64
            resolve(
              `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
            );
          }
        });

        pdfParser.on("pdfParser_dataError", (err) => {
          console.error("PDF parsing error:", err);
          // On error, return as base64
          resolve(
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
          );
        });

        // Parse PDF directly from buffer
        pdfParser.parseBuffer(file.buffer);
      });
    } else {
      // For images, return base64
      return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    }
  } catch (error) {
    console.error("File processing error:", error);
    throw new Error("Failed to process file");
  }
}
