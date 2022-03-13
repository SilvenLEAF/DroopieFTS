import React, { createContext, useState } from 'react'
import HouseWorkInterface from '../../interfaces/HouseWorkDataInterface';




interface allTaskContextInterface {
  allTasks: HouseWorkInterface[] | undefined,
  setAllTasks: Function
}



interface propsInterface {
  children: React.ReactNode
}






export const AllTaskContext = createContext({} as allTaskContextInterface);






function AllTaskContextProvider(props: propsInterface) {
  const [allTasks, setAllTasks] = useState([]);
  return (
    <AllTaskContext.Provider value={{ allTasks, setAllTasks }} >
      { props.children }
    </AllTaskContext.Provider>
  )
}

export default AllTaskContextProvider
