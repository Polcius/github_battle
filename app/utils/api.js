const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

//Utility functions to fetch data from the GitHub API and display it later in the components

async function getProfile (username) {
  const response = await fetch(`https://api.github.com/users/${username}${params}`)
  
  return response.json();
}

async function getRepos (username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`);

  return response.json();
}

function getStarCount (repos) {
  return repos.reduce((count, { stargazers_count }) => count +stargazers_count, 0);
}
//Random algorithm, multiplies followers by 3
function calculateScore ({ followers }, repos) {
  return (followers * 3) + getStarCount(repos);
}

function handleError (error) {
  console.warn(error);
  return null;
}

async function getUserData (player) {
  const [ profile,repos ] = await Promise.all([
    getProfile(player),
    getRepos(player)
  ])

  return {
    profile,
    score: calculateScore(profile, repos)
  }
}

function sortPlayers (players) {
  //Ascending sort
  return players.sort((a,b) => b.score - a.score);
}

export async function battle (players) {
  const results = await Promise.all(players.map(getUserData))
  .catch(handleError);
  
  return results === null
  ? results
  : sortPlayers(results);
}
//Fetches GitHub repositories sorted by star count. Takes language as a variable (defined in Popular.js component)
export async function fetchPopularRepos(language) {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

  const response = await fetch(encodedURI)
  .catch(handleError);

  const repos = await response.json();

  return repos.items;

}

