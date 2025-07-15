import Link from "next/link";

const Footer =  () => {
  return (
    <footer>
      <nav>
        <ul className="flex">
          <li className="mr-5">
            <Link href="/">ホーム</Link>
          </li>
          <li>
            <Link href="/ingredients">材料</Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer;