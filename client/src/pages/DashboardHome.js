import React from 'react'
import {Switch, Route, Link, Redirect, useHistory} from 'react-router-dom'
import Dashboard from './Dashboard'
import AnythingElseDialog from '../dialogs/feedback/AnythingElseDialog'
import OverallDialog from '../dialogs/feedback/OverallDialog';
import ReviewDialog from '../dialogs/feedback/ReviewDialog';
import StrengthsDialog from '../dialogs/feedback/StrengthsDialog';
import WeaknessesDialog from '../dialogs/feedback/WeaknessesDialog';
import RecommendationsDialog from '../dialogs/feedback/RecommendationsDialog';


function DashboardHome() {
    const history = useHistory();

    const handleFeedbackDialogsClose = (value) => {
        history.push("/dashboard")
      };
    
      const handleOvearllNextQuestionClick = () => {
        history.push("/dashboard/:id/feedback/2");
      };
    
      const handleReviewDialogNext = () => {
        history.push("/dashboard/:id/feedback/3");
      };
    
      const handleReviewDialogPrevious = () => {
        history.push("/dashboard/feedback/1");
      };
    
      const handleStrengthsDialogNext = () => {
        history.push("/dashboard/feedback/4");
      };
    
      const handleStrengthsDialogPrevious = () => {
        history.push("/dashboard/feedback/2");
      };
    
      const handleWeaknessesDialogNext = () => {
        history.push("/dashboard/feedback/5");
      };
    
      const handleWeaknessesDialogPrevious = () => {
        history.push("/dashboard/feedback/3");
      };
    
      const handleRecommendationDialogNext = () => {
        history.push("/dashboard/feedback/6");
      };
    
      const handleRecommendationDialogPrevious = () => {
        history.push("/dashboard/feedback/4");
      };
    
      const handleAnythingElseSubmitClick = () => {
        console.log("Submit clicked");
        history.push("/dashboard");
      };

    return (
        <>
            <Route path="/" component={Dashboard} />
            <Route path={"/:id/feedback/1"}>
                <OverallDialog
                    onClose={handleFeedbackDialogsClose}
                    onNextQuestionClick={handleOvearllNextQuestionClick}
                />
            </Route>
            <Route path={"/:id/feedback/2"}>
                <ReviewDialog
                    onClose={handleFeedbackDialogsClose}
                    onPreviousQuestionClick={handleReviewDialogPrevious}
                    onNextQuestionClick={handleReviewDialogNext}
                />
            </Route>
            <Route path={"/:id/feedback/3"}>
                <StrengthsDialog
                    onPreviousQuestionClick={handleStrengthsDialogPrevious}
                    onNextQuestionClick={handleStrengthsDialogNext}
                />
            </Route>
            <Route path={"/:id/feedback/4"}>
                <WeaknessesDialog
                    onPreviousQuestionClick={handleWeaknessesDialogPrevious}
                    onNextQuestionClick={handleWeaknessesDialogNext}
                />
            </Route>
            <Route path={"/:id/feedback/5"}>
                <RecommendationsDialog
                    onPreviousQuestionClick={handleRecommendationDialogPrevious}
                    onNextQuestionClick={handleRecommendationDialogNext}
                />
            </Route>
            <Route path={"/:id/feedback/6"}>
                <AnythingElseDialog
                    onClose={handleFeedbackDialogsClose}
                    onSubmitClick={handleAnythingElseSubmitClick}
                />
            </Route>
        </>
    );
}

export default DashboardHome;