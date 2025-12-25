import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPostPage';
import { Docs } from './pages/Docs';
import { DocPageWrapper } from './pages/DocPageWrapper';
import { NotFound } from './components/common/NotFound';

function LanguageRedirect() {
  // Detect browser language
  const browserLang = navigator.language.toLowerCase();
  const targetLang = browserLang.startsWith('fi') ? 'fi' : 'en';
  return <Navigate to={`/${targetLang}`} replace />;
}

function App() {
  return (
    <BrowserRouter basename="/DIY-Lake-USV-NMEA-Mapping">
      <Routes>
        {/* Root redirect based on browser language */}
        <Route path="/" element={<LanguageRedirect />} />

        {/* English routes */}
        <Route path="/en" element={<Layout locale="en" />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="docs" element={<Docs />} />
          <Route path="docs/*" element={<DocPageWrapper />} />
        </Route>

        {/* Finnish routes */}
        <Route path="/fi" element={<Layout locale="fi" />}>
          <Route index element={<Home />} />
          <Route path="blogi" element={<Blog />} />
          <Route path="blogi/:slug" element={<BlogPostPage />} />
          <Route path="dokumentaatio" element={<Docs />} />
          <Route path="dokumentaatio/*" element={<DocPageWrapper />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={
          <div className="min-h-screen flex flex-col">
            <NotFound />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
