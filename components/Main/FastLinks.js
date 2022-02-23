import Link from "next/link";

export const FastLinks = ({ style }) => {
  return (
    <div className={style.fastLinks}>
      <ul>
        <li className={`${style.purple} hoverGoTop-sm`}>
          <Link href="/about" alt="about" passHref>
            <a>
              <strong>ABOUT</strong> ME
            </a>
          </Link>
        </li>
        <li className={`${style.green} ${style.big} hoverGoTop-sm`}>
          <Link href="/myprojects" alt="my projects" passHref>
            <a>
              MY <strong>PROJECTS</strong>
            </a>
          </Link>
        </li>
        <li className={`${style.orange} hoverGoTop-sm`}>
          <Link href="/contact" alt="contact" passHref>
            <strong>CONTACT</strong>
          </Link>
        </li>
      </ul>
    </div>
  );
};
