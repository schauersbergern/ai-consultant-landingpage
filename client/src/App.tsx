import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import AdminBlog from "./pages/AdminBlog";
import AdminBlogEditor from "./pages/AdminBlogEditor";
import AdminBlogImport from "./pages/AdminBlogImport";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import ThankYou from "./pages/ThankYou";
import Login from "./pages/Login";
import CookieConsent from "./components/CookieConsent";

function AppRoutes() {
  return (
    <Switch>
      <Route path={"/login"} component={Login} />
      <Route path={"/"} component={Home} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogArticle} />
      <Route path={"/admin/blog"} component={AdminBlog} />
      <Route path={"/admin/blog/new"} component={() => <AdminBlogEditor />} />
      <Route path={"/admin/blog/import"} component={AdminBlogImport} />
      <Route path={"/admin/blog/:id/edit"}>{(params) => <AdminBlogEditor id={params.id} />}</Route>
      <Route path={"/impressum"} component={Impressum} />
      <Route path={"/datenschutz"} component={Datenschutz} />
      <Route path={"/danke"} component={ThankYou} />
      <Route path={"/thank-you"} component={ThankYou} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <AppRoutes />
          <CookieConsent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
