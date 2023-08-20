import { createContext, useState } from 'react'




const ActivityContext = createContext()


function AppContext({ children }){

    const [activities, setActivities] = useState([])

    const store = {
        activities,
        setActivities
    }

    return (
        <ActivityContext.Provider value={store}>
            {children}
        </ActivityContext.Provider>
    );
}

export { ActivityContext, AppContext };