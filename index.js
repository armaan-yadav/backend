const express = require("express");
require("dotenv").config();
const app = express();
const port = 3000;
const githubData = {
  login: "armaan-yadav",
  id: 124185157,
  node_id: "U_kgDOB2bqRQ",
  avatar_url: "https://avatars.githubusercontent.com/u/124185157?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/armaan-yadav",
  html_url: "https://github.com/armaan-yadav",
  followers_url: "https://api.github.com/users/armaan-yadav/followers",
  following_url:
    "https://api.github.com/users/armaan-yadav/following{/other_user}",
  gists_url: "https://api.github.com/users/armaan-yadav/gists{/gist_id}",
  starred_url:
    "https://api.github.com/users/armaan-yadav/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/armaan-yadav/subscriptions",
  organizations_url: "https://api.github.com/users/armaan-yadav/orgs",
  repos_url: "https://api.github.com/users/armaan-yadav/repos",
  events_url: "https://api.github.com/users/armaan-yadav/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/armaan-yadav/received_events",
  type: "User",
  site_admin: false,
  name: "Armaan",
  company: null,
  blog: "",
  location: null,
  email: null,
  hireable: null,
  bio: "A tech enthusiast currently doing BCA",
  twitter_username: null,
  public_repos: 15,
  public_gists: 0,
  followers: 0,
  following: 1,
  created_at: "2023-02-01T16:30:49Z",
  updated_at: "2024-01-26T13:52:51Z",
};
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/github", (req, res) => {
  res.json(githubData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log(process.env.PORT);
