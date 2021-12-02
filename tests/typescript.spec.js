import { resolve, dirname } from "node:path";
import { renderPlop, renderScript } from "./render.js";

import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

test("should load TS file", async () => {
  const { findByText, clear, fireEvent } = await renderScript(
    "--experimental-loader",
    ["esbuild-node-loader", resolve(__dirname, "../instrumented/bin/plop.js")],
    {
      cwd: resolve(__dirname, "./examples/typescript-cjs"),
    }
  );

  await findByText("Please choose a generator");

  clear();
  fireEvent.up();
  fireEvent.down();
  fireEvent.enter();

  expect(await findByText("this is a test")).toBeTruthy();

  fireEvent.sigterm();
});
