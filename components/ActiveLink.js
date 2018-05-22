import Router, { withRouter } from 'next/router'

// typically you want to use `next/link` for this usecase
// but this example shows how you can also access the router
// and use it manually

const onClickHandler = (href) => (event) => {
  event.preventDefault()
  Router.push(href).then(() => window.scrollTo(0, 0))
}

const ActiveLink = ({ children, router, href }) => {
  const active = router.pathname === href
  const className = active ? 'ant-menu-item-selected ant-menu-item' : 'ant-menu-item'
  return (
    <li href='#' onClick={onClickHandler(href)} className={className} role="menuitem" aria-selected="false">
      {children}
    </li>
  )
}

export default withRouter(ActiveLink)
