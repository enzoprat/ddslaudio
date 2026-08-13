import { ImageResponse } from "next/og";

/**
 * Favicon généré : évite de dépendre d'un fichier binaire tant que le
 * logo vectoriel définitif n'a pas été fourni. Reprend le monogramme
 * laiton sur fond encre.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090a",
          color: "#d8a83a",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        DD
      </div>
    ),
    size,
  );
}
