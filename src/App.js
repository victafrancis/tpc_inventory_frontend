import React from "react";
import { Switch, Route} from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import "./App.css";

//context
// import { useAuth } from "contexts/AuthContext";

//containers
// import Login from "containers/Login/Login";
import Layout from "containers/Layout/Layout";

//pages
import Dashboard from "containers/Dashboard/Dashboard";
import Orders from "containers/Orders/Orders";
import Transactions from "containers/Transactions/Transactions";
import Products from "containers/Products/Products";
import Suppliers from "containers/Suppliers/Suppliers";
import Storage from "containers/Storage/Storage";

//theme
import MuiTheme from "themes/MuiTheme";

const App = () => {
  // const { currUser } = useAuth();
  // const history = useHistory();

  // just to clear the url when user logs out
  // useEffect(() => {
  //   if (currUser === null) {
  //     history.replace("/");
  //   }
  // }, [history, currUser]);

  const MuiTheme = createMuiTheme({
    typography: {
     "fontFamily": `"Montserrat", "Helvetica", "Arial", sans-serif`,
    }
  });

  return (
    <MuiThemeProvider theme={MuiTheme}>
      <Switch>
        {/* {currUser !== null ? ( */}
          <Layout>
            <Route exact path="/" component={Dashboard} />
            <Route path="/orders" component={Orders} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/products" component={Products} />
            <Route path="/suppliers" component={Suppliers} />
            <Route path="/storages" component={Storage} />
          </Layout>
        {/* ) : ( */}
          {/* <Login /> */}
        {/* )} */}
      </Switch>
    </MuiThemeProvider>
  );
};

export default App;
