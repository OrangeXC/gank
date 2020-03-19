import { useRouter } from 'next/router'

const ActiveLink = ({ children, href }) => {
  const router = useRouter()
  const active = router.asPath === href
  const className = active
    ? 'ant-menu-item-selected ant-menu-item'
    : 'ant-menu-item'

  const handleClick = e => {
    e.preventDefault()
    router.push(href).then(() => window.scrollTo(0, 0))
  }

  return (
    <li
      href="#"
      onClick={handleClick}
      className={className}
      style={{ float: 'left' }}
      role="menuitem"
      aria-selected="false"
    >
      {children}
    </li>
  )
}

export default ActiveLink
