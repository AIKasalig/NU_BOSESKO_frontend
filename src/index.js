import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from './Components/Navbar';
import AnalyzeSurvey from './AnalyzeSurvey';
import AnalyzeCSV from './AnalyzeCSV';
import SpeechToText from './SpeechToText';
import EmotionGraph from './Components/EmotionGraph';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Navbar/>}>
          <Route index element={<App/>}/>
          <Route path = '/analyzecsv' element={<AnalyzeCSV/>}/>
          <Route path = '/speechtotext' element={<SpeechToText/>}/>
          <Route path = '/analyzesurvey' element = {<AnalyzeSurvey/>}/>
        </Route>
        <Route path='/graphsample' element = {<EmotionGraph/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
