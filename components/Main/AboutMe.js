import { Icon } from "../UI/Icon"
import { AUTHOR_NAME, AUTHOR_SHORT_INFO, GITHUB_USERNAME, AUTHOR_EMAIL, TWITTER_USERNAME } from "../../constants/constants"

export const AboutMe = ({ style }) => {
  return (
    <div className={style.aboutMe}>
        <div className={style.profilePhoto}><img src="https://genki.fueko.net/content/images/size/w800/2021/05/photo-1613420568020-0c0e3764d499.jpeg" alt="Emre Güney" /></div>
        <h2>{AUTHOR_NAME}</h2>
        <p>{AUTHOR_SHORT_INFO}</p>
        <div className={style.socialLinks}>
          <a href={"http://github.com/"+GITHUB_USERNAME} data-social="GitHub">
            <Icon.GitHub size="22" />
          </a>
          <a href={"http://twitter.com"+TWITTER_USERNAME} data-social="Twitter">
            <Icon.Twitter size="22" />
          </a>
          <a href={"mailto:"+AUTHOR_EMAIL} data-social="Email">
            <Icon.Email size="22" />
          </a>
        </div>
      </div>
  )
}
