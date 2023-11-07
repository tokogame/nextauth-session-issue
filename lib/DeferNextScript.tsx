import { NextScript } from 'next/document';

// Following Hack from: https://bravetheheat.medium.com/supercharge-your-next-js-fcp-and-lcp-for-seo-and-ux-5188b236cb62

function dedupe<T extends { file: string }>(bundles: T[]): T[] {
  const files = new Set<string>();
  const kept: T[] = [];

  for (const bundle of bundles) {
    if (files.has(bundle.file)) continue;
    files.add(bundle.file);
    kept.push(bundle);
  }
  return kept;
}

type DocumentFiles = {
  sharedFiles: readonly string[];
  pageFiles: readonly string[];
  allFiles: readonly string[];
};

/**
 * Custom NextScript to defer loading of unnecessary JS.
 * Standard behavior is async. Compatible with Next.js 10.0.3
 */
class DeferNextScript extends NextScript {
  getDynamicChunks(files: DocumentFiles) {
    const {
      dynamicImports,
      assetPrefix,
      isDevelopment,
    } = this.context;

    const bundles = dynamicImports.map((str) => ({ file: str }));

    return dedupe(bundles).map((bundle) => {
      if (!bundle.file.endsWith('.js') || files.allFiles.includes(bundle.file))
        return null;

      return (
        <script
          defer={!isDevelopment}
          key={bundle.file}
          src={`${assetPrefix}/_next/${encodeURI(
            bundle.file
          )}`}
          nonce={this.props.nonce}
          crossOrigin={
            this.props.crossOrigin || process.env.__NEXT_CROSS_ORIGIN
          }
        />
      );
    });
  }
  getScripts(files: DocumentFiles) {
    const {
      assetPrefix,
      buildManifest,
      isDevelopment,
    } = this.context;

    const normalScripts = files.allFiles.filter((file) => file.endsWith('.js'));
    const lowPriorityScripts = buildManifest.lowPriorityFiles?.filter((file) =>
      file.endsWith('.js')
    );

    return [...normalScripts, ...lowPriorityScripts].map((file) => {
      return (
        <script
          key={file}
          src={`${assetPrefix}/_next/${encodeURI(
            file
          )}`}
          nonce={this.props.nonce}
          defer={!isDevelopment}
          crossOrigin={
            this.props.crossOrigin || process.env.__NEXT_CROSS_ORIGIN
          }
        />
      );
    });
  }
}

export default DeferNextScript;