const fs = require("fs");
const path = require("path");

// Read the 3 PNG files already generated
const sizes = [16, 32, 48];
const pngFiles = sizes.map(s => fs.readFileSync(path.join("public", `favicon-${s}x${s}.png`)));

// ICO structure: 6-byte header + 16-byte directory entries + raw PNG data
const ICO_HEADER_SIZE = 6;
const ICO_DIR_ENTRY_SIZE = 16;
const dataOffset = ICO_HEADER_SIZE + ICO_DIR_ENTRY_SIZE * sizes.length;

const totalSize = dataOffset + pngFiles.reduce((acc, buf) => acc + buf.length, 0);
const ico = Buffer.alloc(totalSize);

// Header
ico.writeUInt16LE(0, 0);             // Reserved
ico.writeUInt16LE(1, 2);             // Type: 1 = ICO
ico.writeUInt16LE(sizes.length, 4);  // Number of images

let dataPtr = dataOffset;
sizes.forEach((s, i) => {
  const dirBase = ICO_HEADER_SIZE + ICO_DIR_ENTRY_SIZE * i;
  const pngLen = pngFiles[i].length;
  ico.writeUInt8(s === 256 ? 0 : s, dirBase);      // Width (0 means 256)
  ico.writeUInt8(s === 256 ? 0 : s, dirBase + 1);  // Height
  ico.writeUInt8(0, dirBase + 2);                  // Color count
  ico.writeUInt8(0, dirBase + 3);                  // Reserved
  ico.writeUInt16LE(1, dirBase + 4);               // Planes
  ico.writeUInt16LE(32, dirBase + 6);              // Bits per pixel
  ico.writeUInt32LE(pngLen, dirBase + 8);          // Size of image data
  ico.writeUInt32LE(dataPtr, dirBase + 12);        // Offset to image data
  pngFiles[i].copy(ico, dataPtr);
  dataPtr += pngLen;
});

fs.writeFileSync("src/app/favicon.ico", ico);
fs.writeFileSync("public/favicon.ico", ico);
console.log(`favicon.ico created: ${ico.length} bytes (${sizes.join(", ")}px)`);
