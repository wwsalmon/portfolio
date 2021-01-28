---
layout: post
tags: code
date: '2021-01-28 16:29:21'
title: How To Set Up Tailwind and Typescript in Next.js IN ONE STEP
---

**Run `npx create-next-app [your-project-name] -e https://github.com/wwsalmon/next-tailwind-typescript-example`.**

That's it. `cd` into your project and get to work with Typescript and Tailwind fully set up, no extra frills included.

I made [`next-tailwind-typescript-example`](https://github.com/wwsalmon/next-tailwind-typescript-example) after manually setting up Typescript and Tailwind a few too many times. `create-next-app`, Tailwind, and Next make manual set up easier than ever, but it's still tedious to do it over and over again.

If you're curious, though, here's what the six-step manual setup looks like:

1. Run `npx create-next-app [your-project-name]` to get a Next project created and packages installed and such.
2. Install Typescript with `npm i typescript @types/react @types/node`. Rename all your `js` files to `tsx` ones. `tsconfig.json` and `next-env.d.ts` files will be created when you first run `npm run dev` or `next dev`, so you don't have to worry about any manual config.
3. Install Tailwind with `npm i tailwindcss postcss-preset-env -D`.
4. Create a `postcss.config.js` with the following contents:
	
	```
	module.exports = {
	    plugins: ['tailwindcss', 'postcss-preset-env'],
	} 
	```

5. Create a `tailwind.config.js` with the following contents:
	
	```
	module.exports = {
	  purge: [
	    './**/*.html',
	    './**/*.tsx',
	  ],
	  theme: {},
	  variants: {},
	  plugins: [],
	}
	```
	
6. Add the following to the top of your `global.css` file:
	
	```
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	```

Now get cracking away at whatever you're building!

I like to strip out `create-next-app`'s default contents as well, i.e. deleting `Home.module.css`, deleting the contents of `public` and `pages/api`, and clearing the contents of `index.js` and `global.css`. I also add a `_document.tsx` file to make it easy to link Google Fonts, for example. All of these configurations are made in my example repo.