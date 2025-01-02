import { Refine, Authenticated } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider} from "./providers";
import { authProvider } from "./providers/";
import {Home, ForgotPassword, Login, Register, CompanyList, Create, EditPage, List} from "./pages";


import routerProvider, {
    CatchAllNavigate,
    DocumentTitleHandler, NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp  } from "antd";

import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {Layout} from "@/components/layout";
import {resources} from "@/config/resources";
import CreateTask from "@/pages/tasks/create";
import EditTask from "@/pages/tasks/edit";
import TasksCreatePage from "@/pages/tasks/create";


function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: false,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "M0cpBq-lXGHPq-lN0qFV",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  {/*<Route index element={<WelcomePage />} />*/}

                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route
                        element={
                            <Authenticated
                                key="authenticated-layout"
                                fallback={<CatchAllNavigate to="/login" />}
                            >
                                <Layout>
                                    <Outlet />
                                </Layout>
                            </Authenticated>
                        }
                    >
                        <Route index element={<Home />} />
                        <Route path="/companies">
                            <Route index element={<CompanyList />} />
                            <Route path="new" element={<Create />}/>
                            <Route path="edit/:id" element={<EditPage />}/>
                        </Route>
                        <Route path="/tasks" element={
                            <List>
                                <Outlet />
                            </List>
                        }>
                            <Route path="new" element={<TasksCreatePage />}/>
                            <Route path="edit/:id" element={<EditTask />}/>
                        </Route>
                    </Route>
                </Routes>
                  <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>

      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
