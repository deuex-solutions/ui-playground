import { FunctionComponent } from "react";
import AppRouter from "routers/app/app.router";

export const App: FunctionComponent = () => {
    return (
        <div className="App">
            <AppRouter />
        </div>
    );
};

export default App;
