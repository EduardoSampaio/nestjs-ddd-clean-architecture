import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    test: {
        globals: true,
        root: './',
        environment: 'node',
    },
    plugins: [
        tsConfigPaths(),
        swc.vite(),
    ]
});
