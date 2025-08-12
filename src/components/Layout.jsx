
const Layout = ({ children }) => {

    return (
        <div className="h-screen w-screen p-4 ">
            <div className="bg-slate-100">
                { children }
            </div>
        </div>
    )
}

export default Layout;