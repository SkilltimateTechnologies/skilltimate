import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { Provider } from "./components/provider";
import { AgentFeedback } from "@runablehq/website-runtime";
import Landing from "./pages/landing";
import CoursePage from "./pages/course";
import Blog from "./pages/blog";
import ArticlePage from "./pages/article";
import About from "./pages/about";
import Contact from "./pages/contact";
import FAQ from "./pages/faq";
import Legal from "./pages/legal";
import AdminPage from "./pages/admin";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function App() {
  return (
    <Provider>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={ArticlePage} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/faq" component={FAQ} />
        <Route path="/privacy">{() => <Legal kind="privacy" />}</Route>
        <Route path="/terms">{() => <Legal kind="terms" />}</Route>
        <Route path="/admin" component={AdminPage} />
        <Route path="/:slug" component={CoursePage} />
      </Switch>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
    </Provider>
  );
}

export default App;
