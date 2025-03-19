// components/common/NavBar.tsx
import Link from "next/link"
import { useRouter } from "next/router"

const NavBar: React.FC = () => {
  const router = useRouter()
  const currentPath = router.pathname

  // Define navigation items with label and target path
  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/aboutUs" },
    { label: "Contact", path: "/contact" },
  ]

  return (
    <nav>
      <ul className="flex space-x-4">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link href={item.path}>
              <div
                className={`px-3 py-2 rounded transition-colors duration-200 ${
                  currentPath === item.path
                    ? "bg-blue-500 text-white"
                    : "text-gray-800 hover:bg-blue-100"
                }`}
              >
                {item.label}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
