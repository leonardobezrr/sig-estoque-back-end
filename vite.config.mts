import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            provider: 'istanbul',
            reportsDirectory: './coverage',
            reporter: ['text', 'lcov'],
        },
    },
});