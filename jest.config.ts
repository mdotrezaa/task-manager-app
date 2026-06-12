const config = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/$1"
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

	collectCoverage: true,
	collectCoverageFrom: [
		"app/**/*.{ts,tsx}",
		"components/**/*.{ts,tsx}",
		"hooks/**/*.{ts,tsx}",
		"!app/layout.tsx",
		"!app/providers.tsx",
		"!components/ui/**",
		"!**/*.d.ts"
	],
	testPathIgnorePatterns: [
		"/node_modules/",
		"<rootDir>/components/ui/"
	],
	coverageDirectory: "coverage"
}

export default config