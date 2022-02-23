import { Icon } from "../UI/Icon"

export const AboutMe = ({ style }) => {
  return (
    <div className={style.aboutMe}>
        <div className={style.profilePhoto}><img src="https://genki.fueko.net/content/images/size/w800/2021/05/photo-1613420568020-0c0e3764d499.jpeg" alt="Emre Güney" /></div>
        <h2>Emre Güney</h2>
        <p>Trying to be front-end, maybe even full-stack developer...</p>
        <div className={style.socialLinks}>
          <a href="http:/twitter.com" data-social="GitHub">
            <Icon.GitHub size="22" />
          </a>
          <a href="http:/twitter.com" data-social="Twitter">
            <Icon.Twitter size="22" />
          </a>
          <a href="http:/twitter.com" data-social="Email">
            <Icon.Email size="22" />
          </a>
        </div>
      </div>
  )
}
