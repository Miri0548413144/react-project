import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import * as Actions from '../store/action'
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
export default function Header() {
    const user = useSelector(state => state.user);

    const dispatch = useDispatch()
    const signout = () => {
        dispatch({ type: Actions.SET_USER, payload: null }, { type: Actions.GET_TO_SHOPPING, payload: [] })
    }
    if (!user)
        return <div class="header header-bottom">
            <div class="App-header ">
                <Link to="/login">  כניסה</Link>
                <Link to="/sighin"  >הרשמה</Link>
            </div>
            <div className="my-img"></div>
        </div>
    else return <div class="header header-bottom">
        <div className="App-header ">
            <Link to="/homePage" >עמוד הבית</Link>
            <br />
            <Link to="/recipes" >מתכונים</Link>
            <br />
            <Link to="/addRecipes" >הוסף מרשם</Link>
            <br />
            <Link to="/myRecipes" >המתכונים שלי</Link>
            <br />
            <Link to="/shoppingList" > רשימת קניות</Link>
            <br />
        </div>
        <div className="App-header som">
            <Link to="/" onClick={() => signout()}>
                <div className="user" >
                    <div> {user.Name}  <PersonOutlineIcon /></div>
                    <div>החלף משתמש</div>
                </div>
            </Link>
            <div className="my-img"></div>
        </div>

    </div>
}