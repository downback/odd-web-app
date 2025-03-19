// components/common/Header.tsx
import Image from "next/image"
import NavBar from "./NavBar"

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between">
      {/* Logo and App Name */}
      <div className="flex items-center space-x-2">
        <Image
          src="/images/LogoBlack.png"
          alt="LogoBlack"
          width={150}
          height={50}
        />
      </div>

      {/* Navigation Bar */}
      <NavBar />

      {/* Language Change Button */}
      <div className="px-4 py-2 ">EN / KR</div>
    </header>
  )
}

export default Header
