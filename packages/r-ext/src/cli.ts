#!/usr/bin/env node

import { exit } from "node:process";

const [cmd, firstArg, ..._args] = process.argv.slice(1);

if (firstArg === "build") {
	const { default: build } = await import("./build.js");
	await build();
} else if (firstArg === "dev") {
	const { default: watch } = await import("./watch.js");
	await watch();
} else {
	const { default: watch } = await import("./watch.js");
	try {
		await watch(firstArg);
	} catch (error) {
		console.error(error);
		console.error(`Usage: ${cmd} [command] [root]`);
		exit(1);
	}
}
