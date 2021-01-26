---
title: Creating a Ping Pong Elo Tracker for Edyfi in 1 Hour
layout: post
tags: project code edyfi
date: '2021-01-25 13:24:59'
---

![]({{ site.baseurl }}/img/blog/2021-01/edyfi-elo/final.jpg)

At the community house [Edyfi](https://edyfi.co/85e37d59e0064c8d8f4f2cb91168eb18), we have a ping pong table. As soon as quanratine ended, we started playing a lot of ping pong.

Ben and Luke put together a roll of white board paper on the wall to track their ping pong games. Over the course of the day, the rest of us added our games as well.

It got chaotic pretty quickly, and I got to thinking -- what if we had an Elo rating system for the house? Matches would have actual stakes attached. This is day two of ping pong being available and we'll be here for two more months, figuring out a rating system felt like a good investment.

Immediately, my mind went to creating a React app. Ben recommended we look for an existing tool first. We found [https://github.com/altuzar/pingpong-elo-ranking](https://github.com/altuzar/pingpong-elo-ranking), but it was a little jank (requiring each player to make an account and log in to log games). At the end of the day, I was surprised to come up short, without a good existing solution. So, building our own it was.

I got as far as typing `create-next-app` into my terminal before restraining myself again. React is so heavy, surely there was a way to do this without React. We would need a database, too. Here, my mind went to AirTable. I set up a table and put in existing games pretty quickly, with a couple of nice fields like auto-incrementing IDs, creation datetime, and winning player determined by score.

![]({{ site.baseurl }}/img/blog/2021-01/edyfi-elo/airtable.jpg)

I then set about looking how to calculate Elo through AirTable, but confronted with the difficulty of using formulas across tables and the heft of developing an AirTable app to use scripts, I gave up and decided to use AirTable's API and handle calculations separately.

Considering that AirTable's API requires an authentication token to access, my browser-JS dream went out the window too. I needed to set up serverside functions of some sort, as well as a frontend. Put those needs together, and the best tool by far is...NextJS. I hate to use something as heavy as React for something this simple, but devX trumps stack efficiency for a quick build like this. Let's get into it then!

## Accessing AirTable
First, I created a `.env` file and threw my AirTable key in it. Nice and secure, and NextJS makes this zero-config.

In typical create-next-app fashion, I deleted the `/api` folder, `/public` items, `Home.module.css`, and the contents of `index.js`. I'll leave `globals.css` to have some easy styling.

`npm i airtable` gets me AirTable's JS library. Now it's easy to fetch info for all games using `getServerSideProps`:

```jsx
import Head from 'next/head';
import airtable from "airtable";

export default function Home({games}) {
    console.log(games);

    return (
        <>
            <Head>
                <title>Edyfi ping pong Elo tracker</title>
            </Head>
        </>
    );
}

export async function getServerSideProps(ctx) {
    const base = airtable.base("appJW8IinnjFjPllg");
    const games = await base("Games").select().all();
    const gamesFields = games.map(d => d.fields);
    return {props: {games: JSON.parse(JSON.stringify(gamesFields))}};
}
```

![]({{ site.baseurl }}/img/blog/2021-01/edyfi-elo/browser.jpg)

## Calculating Elo
With some nice ES6 array operations, we first get a list of unique players from the game records, then initialize an object with each player's Elo rating:

```jsx
// all unique player names
const allPlayers = [...games.map(d => d["Player 1"]), ...games.map(d => d["Player 2"])]
		.filter((d, i, a) => a.indexOf(d) === i);

// initialize dictionary with each player at rating 1000
let playerElos = Object.fromEntries(allPlayers.map(d => [d, 1000]));

console.log(playerElos);
```

![]({{ site.baseurl }}/img/blog/2021-01/edyfi-elo/ratings.jpg)

Now we just need to run through all the games and use the Elo formula to calculate the Elo for each player:

![]({{ site.baseurl }}/img/blog/2021-01/edyfi-elo/elo-formula.png)

(Credit: [https://www.coorpacademy.com/en/blog/learning-innovation-en/elo-whos-the-best/](https://www.coorpacademy.com/en/blog/learning-innovation-en/elo-whos-the-best/))

```jsx
// maximum amount rating can be changed per game
const maxChange = 30;

for (let game of games.sort((a, b) => +new Date(a["Date"]) < +new Date(b["Date"]))) {
        const rating1 = playerElos[game["Player 1"]];
        const rating2 = playerElos[game["Player 2"]];
        const expected1 = 1 / (1 + 10 ** ((rating2 - rating1) / 400))
        const expected2 = 1 / (1 + 10 ** ((rating1 - rating2) / 400))
        const score1 = +(game["Win"] === game["Player 1"]);
        const score2 = +(game["Win"] === game["Player 2"]);
        const newRating1 = rating1 + maxChange * (score1 - expected1);
        const newRating2 = rating2 + maxChange * (score2 - expected2);
        playerElos[game["Player 1"]] = newRating1;
        playerElos[game["Player 2"]] = newRating2;
}
```

![]({{ site.baseurl }}/img/blog/2021-01/edyfi-elo/elos.jpg)

## Displaying Elo and games
First, let's refactor the earlier calculations into a state variable and `useEffect` hook:

```jsx
const [playerElos, setPlayerElos] = useState(function(){
        // all unique player names
        const allPlayers = [...games.map(d => d["Player 1"]), ...games.map(d => d["Player 2"])]
                .filter((d, i, a) => a.indexOf(d) === i);

        // initialize dictionary with each player at rating 1000
        return Object.fromEntries(allPlayers.map(d => [d, 1000]));
}());

useEffect(() => {
        // maximum amount rating can be changed per game
        const maxChange = 30;

        let newPlayerElos = {...playerElos};

        for (let game of games.sort((a, b) => +new Date(a["Date"]) < +new Date(b["Date"]))) {
                const rating1 = newPlayerElos[game["Player 1"]];
                const rating2 = newPlayerElos[game["Player 2"]];
                const expected1 = 1 / (1 + 10 ** ((rating2 - rating1) / 400))
                const expected2 = 1 / (1 + 10 ** ((rating1 - rating2) / 400))
                const score1 = +(game["Win"] === game["Player 1"]);
                const score2 = +(game["Win"] === game["Player 2"]);
                const newRating1 = rating1 + maxChange * (score1 - expected1);
                const newRating2 = rating2 + maxChange * (score2 - expected2);
                newPlayerElos[game["Player 1"]] = newRating1;
                newPlayerElos[game["Player 2"]] = newRating2;
        }

        setPlayerElos(newPlayerElos);
}, []);
```

For styling, I went with [`water.css`](https://watercss.kognise.dev/), a classless CSS framework. From here, it's super easy to bash out a few HTML tables and get the rest of the site going:

```jsx
<Head>
    <title>Edyfi ping pong Elo tracker</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"/>
</Head>
<h2>Player stats</h2>
<table>
    <thead>
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Elo</th>
        </tr>
    </thead>
    <tbody>
        {Object.entries(playerElos)
            .sort((a, b) => b[1] - a[1])
            .map((player, i) => (
                <tr>
                    <td>{i + 1}</td>
                    <td>{player[0]}</td>
                    <td>{Math.floor(player[1])}</td>
                </tr>
            ))
        }
    </tbody>
</table>
<hr/>
<h2>Post new game</h2>
<p><a href="https://airtable.com/shrl6FUmJspGANrPK">+ Post new game through AirTable form</a></p>
<hr/>
<h2>Past games</h2>
<table>
    <thead>
        <tr>
            <th>Date</th>
            <th>Player 1</th>
            <th>Score 1</th>
            <th>Player 2</th>
            <th>Score 2</th>
        </tr>
    </thead>
    <tbody>
    {games.sort((a, b) => +new Date(b["Date"]) - +new Date(a["Date"])).map(game => (
        <tr>
            <td>{format(new Date(game.Date), "M/d 'at' h:mm aa")}</td>
            <td>{game["Player 1"]}</td>
            <td>{game["Player 1 score"]}</td>
            <td>{game["Player 2"]}</td>
            <td>{game["Player 2 score"]}</td>
        </tr>
    ))}
    </tbody>
</table>
```

I'll stop here for this basic implementation, but there's much more that can be done with this interface (some updates, like win/loss counts, are shown in the final image at the top of this post)! Per-game Elo, specific matchup records, player win/loss records, etc. That's just a matter of more lines of code, though, so I won't document it that thoroughly.

![]({{ site.baseurl }}/img/blog/2021-01/edyfi-elo/prototype.jpg)

From here, it was a super easy one-click deploy to Vercel, and the site was live for all the members of the house to use. Productivity has since tanked.

Nothing super fancy going on here, but it's pretty amazing how easy it is to bash out a full webapp in less than an hour with today's web technology and services.