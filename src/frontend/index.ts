const reactBuild = await Bun.build({
    entrypoints: [`${__dirname}/react/main.tsx`],
    target: "browser",
    minify: {
        identifiers: true,
        syntax: true,
        whitespace: true,
    },
});

const html = Bun.file(`${__dirname}/index.html`);

export { reactBuild, html };