import { useState, useEffect } from "react";
import axios from "axios";
import style from "../../../styles/Aside.module.css";
import { Icon } from "../../UI/Icon";
import Link from "next/link";
export const Aside = ({ toggle }) => {
  const [github, setgithub] = useState([]);
  const [repos, setRepos] = useState([]);
  // fetch my github profile information
  const getGitHubInfo = async () => {
    const githubRes = await axios.get("https://api.github.com/users/eeguney");
    const repoRes = await axios.get(
      "https://api.github.com/users/eeguney/repos"
    );
    setgithub(githubRes.data);
    setRepos(repoRes.data);
  };
  useEffect(() => {
    getGitHubInfo();
  }, []);
  return (
    <aside className={`${style.aside} ${toggle ? "drawerIsOpen" : ""}`}>
      <widget className={style.widget}>
        <label>My GitHub Profile</label>
        <div className={style.gitHubCard}>
          <header>
            <div className={style.cover}></div>
            <div className={style.avatar}>
              <Link href=""><a><img src={github.avatar_url} alt={github.name} /></a></Link>
            </div>
          </header>
          <div className={style.userInfo}>
            <span className={style.gitHubIcon}>
              <Icon.GitHub size="26" />
            </span>
            <h3><Link href=""><a>{github.name}</a></Link></h3>
            <span className={style.userTag}><Link href=""><a>@{github.login}</a></Link></span>
            <p>{github.bio}</p>
          </div>
          <footer>
            <div className={style.repoStatistics}>
              <div className={style.statistic}>
                <label className={style.statisticsKey}>Followers</label>
                <span className={style.statisticsValue}>
                  {github.followers}
                </span>
              </div>
              <div className={style.statistic}>
                <label className={style.statisticsKey}>Following</label>
                <span className={style.statisticsValue}>
                  {github.following}
                </span>
              </div>
              <div className={style.statistic}>
                <label className={style.statisticsKey}>Repositories</label>
                <span className={style.statisticsValue}>
                  {github.public_repos}
                </span>
              </div>
            </div>
          </footer>
        </div>
      </widget>

      <widget className={style.widget}>
        <label>My GitHub Repos</label>
        <div className={style.gitHubRepo}>
          { repos.slice(0,5).map((repo, index) => (
            <div key={index} className={style.repoItem}>
            <Link href="">
              <a>
              <header>
              <h3 className={style.repoName}>{repo.name}</h3>
              {repo.description &&<p className={style.repoDesc}>{repo.description}</p>}
              {repo.language && <span className={style.language}>{repo.language}</span>}
            </header>
            <div className={style.statistic}>
              <div className={style.statisticItem}>
                <label>Star:</label>
                <span>{repo.stargazers_count}</span>
              </div>
              <div className={style.statisticItem}>
                <label>Watchers:</label>
                <span>{repo.watchers_count}</span>
              </div>
              <div className={style.statisticItem}>
                <label>Forks:</label>
                <span>{repo.forks_count}</span>
              </div>
            </div>
              </a>
            </Link>
          </div>
          )) }
        </div>
      </widget>
    </aside>
  );
};