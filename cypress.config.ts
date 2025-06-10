import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    specPattern: 'src/tests/e2e/**/*.cy.{js,ts,jsx,tsx}',
  },
}); 