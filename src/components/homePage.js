import { useSelector } from "react-redux"
export default function HomePage() {
    const user = useSelector(state => state.user);
    return (<div class="App-header background-img home">
    </div>)
}