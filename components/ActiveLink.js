import Router, { withRouter } from 'next/router'

const onClickHandler = href => event => {
  event.preventDefault()
  Router.push(href).then(() => window.scrollTo(0, 0))
}

const ActiveLink = ({ children, router, href }) => {
  const active = router.asPath === href
  const className = active
    ? 'ant-menu-item-selected ant-menu-item'
    : 'ant-menu-item'

  return (
    <li
      href="#"
      onClick={onClickHandler(href)}
      className={className}
      style={{ float: 'left' }}
      role="menuitem"
      aria-selected="false"
    >
      {children}
    </li>
  )
}

export default withRouter(ActiveLink)
