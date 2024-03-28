
import './App.css'
import ListMembersComponent from './components/ListMembersComponent'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import MemberComponent from './components/MemberComponent'
import ShowDetailsComponent from './components/ShowDetailsComponent'
import HeaderComponent from './components/HeaderComponent'

function App() {
  return (
    <>
    <BrowserRouter>
        <HeaderComponent/>
        <Routes>
          {/* http://localhost:3000/ */}
          <Route path='/' element={<ListMembersComponent/>}> </Route>

          {/* http://localhost:3000/members */}
          <Route path='/members' element={<ListMembersComponent/>}> </Route>

          {/* http://localhost:3000/add-member */}
          <Route path='/add-members' element={<MemberComponent/>}> </Route>

          {/* http://localhost:3000/update-member */}
          <Route path='/update-member/:id' element={<MemberComponent/>}> </Route>

          {/* http://localhost:3000/show-details-member */}
          <Route path='/show-details-member/:id' element={<ShowDetailsComponent/>}> </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
