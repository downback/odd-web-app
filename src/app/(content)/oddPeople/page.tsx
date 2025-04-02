import React from "react"
import OddPeopleHeader from "./_component/OddPeopleHeader"
import OddPeopleList from "./_component/OddPeopleList"

const OddPeoplePage: React.FC = () => {
  return (
    <div className="relative h-dvh">
      <OddPeopleHeader />
      <OddPeopleList />
    </div>
  )
}

export default OddPeoplePage
