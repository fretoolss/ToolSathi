import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Pages
import Dashboard from './pages/Dashboard';
import YoutubeTools from './pages/YoutubeTools';
import TradingTools from './pages/TradingTools';
import SeoTools from './pages/SeoTools';
import UtilityTools from './pages/UtilityTools';

// Info Pages
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';

// Individual Tools
import ViralTitleGenerator from './pages/tools/ViralTitleGenerator';
import TagGenerator from './pages/tools/TagGenerator';
import ThumbnailAnalyzer from './pages/tools/ThumbnailAnalyzer';
import RiskRewardCalculator from './pages/tools/RiskRewardCalculator';
import PositionSizeCalculator from './pages/tools/PositionSizeCalculator';
import CryptoProfitCalculator from './pages/tools/CryptoProfitCalculator';
import CompoundingCalculator from './pages/tools/CompoundingCalculator';
import KeywordDensityChecker from './pages/tools/KeywordDensityChecker';
import MetaDescriptionGenerator from './pages/tools/MetaDescriptionGenerator';
import WordCounter from './pages/tools/WordCounter';
import PercentageCalculator from './pages/tools/PercentageCalculator';
import AgeCalculator from './pages/tools/AgeCalculator';
import EmiCalculator from './pages/tools/EmiCalculator';
import ImageCompressor from './pages/tools/ImageCompressor';
import PdfToJpg from './pages/tools/PdfToJpg';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          
          <Route path="youtube">
            <Route index element={<YoutubeTools />} />
            <Route path="viral-title" element={<ViralTitleGenerator />} />
            <Route path="tags" element={<TagGenerator />} />
            <Route path="thumbnail-analyzer" element={<ThumbnailAnalyzer />} />
          </Route>

          <Route path="trading">
            <Route index element={<TradingTools />} />
            <Route path="risk-reward" element={<RiskRewardCalculator />} />
            <Route path="position-size" element={<PositionSizeCalculator />} />
            <Route path="crypto-profit" element={<CryptoProfitCalculator />} />
            <Route path="compounding" element={<CompoundingCalculator />} />
          </Route>

          <Route path="seo">
            <Route index element={<SeoTools />} />
            <Route path="keyword-density" element={<KeywordDensityChecker />} />
            <Route path="meta-description" element={<MetaDescriptionGenerator />} />
            <Route path="word-counter" element={<WordCounter />} />
          </Route>

          <Route path="utility">
            <Route index element={<UtilityTools />} />
            <Route path="percentage" element={<PercentageCalculator />} />
            <Route path="age" element={<AgeCalculator />} />
            <Route path="emi" element={<EmiCalculator />} />
            <Route path="image-compressor" element={<ImageCompressor />} />
            <Route path="pdf-to-jpg" element={<PdfToJpg />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
