interface LegalPagesLayoutProps {
  children: React.ReactNode
}

const LegalPagesLayout: React.FC<LegalPagesLayoutProps> = ({ children }) => {
  return <div className="min-h-screen flex flex-col">{children}</div>
}

export default LegalPagesLayout
