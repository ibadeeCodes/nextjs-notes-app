import Link from 'next/link'

const Navbar = () => (
  <nav className='navbar'>
    <Link href='/'>
      <a className='navbar__brand'>Note App</a>
    </Link>
    <Link href='/new'>
      <a className='navbar__create'>Create Note</a>
    </Link>
  </nav>
)

export default Navbar
