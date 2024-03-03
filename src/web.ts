import { html, reactBuild } from "./frontend/index";

import "dotenv/config";

const server = Bun.serve({
    port: 3000,
    fetch: async (req, server) => {
        const { pathname } = new URL(req.url);

        if (pathname === "/main.js" && req.method === "GET") {
            return new Response(reactBuild.outputs[0].stream(), {
                headers: {
                    'Content-Type': reactBuild.outputs[0].type,
                },
            });
        };

        if (pathname === "/" && req.method === "GET") {
            const indexContent = await html.text();

            const contentWithReactScript = indexContent.replace(
                "<!-- react-script -->",
                `<script type="module" src="/main.js"></script>`,
            );

            return new Response(contentWithReactScript, {
                headers: {
                    'Content-Type': 'text/html',
                },
            });
        }

        return new Response('Not Found', { status: 404 });
    }
});

console.log(`Listening on localhost:${server.port}`);