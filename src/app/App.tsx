import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Layout } from '../components/Layout';

// New pages
import { Dashboard } from '../pages/Dashboard';
import { TaskTracker } from '../pages/TaskTracker';
import { KanbanBoard } from '../pages/KanbanBoard';
import { CalendarView } from '../pages/CalendarView';
import { SeasonTracker } from '../pages/SeasonTracker';
import { ResourcesPage } from '../pages/ResourcesPage';
import { DocumentationHub } from '../pages/DocumentationHub';
import { MediaLibrary } from '../pages/MediaLibrary';
import { TeamPage } from '../pages/TeamPage';
import { WelfarePage } from '../pages/WelfarePage';
import { CriticalPath } from '../pages/CriticalPath';
import { PrizeDrawRecord } from '../pages/PrizeDrawRecord';

// Existing view wrappers
import { OverviewPage } from '../pages/OverviewPage';
import { BudgetPage } from '../pages/BudgetPage';
import { RisksPage } from '../pages/RisksPage';
import { CompliancePage } from '../pages/CompliancePage';
import { StrategyPage } from '../pages/StrategyPage';
import { CommsPage } from '../pages/CommsPage';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskTracker />} />
            <Route path="/kanban" element={<KanbanBoard />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/seasons" element={<SeasonTracker />} />
            <Route path="/critical-path" element={<CriticalPath />} />
            <Route path="/resources" element={<ResourcesPage />} />          <Route path="/docs" element={<DocumentationHub />} />            <Route path="/media-library" element={<MediaLibrary />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/risks" element={<RisksPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/strategy" element={<StrategyPage />} />
            <Route path="/comms" element={<CommsPage />} />
            <Route path="/welfare" element={<WelfarePage />} />
            <Route path="/prize-draws" element={<PrizeDrawRecord />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DndProvider>
  );
}
