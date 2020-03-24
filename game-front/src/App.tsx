import * as React from 'react';
import { Switch, Route } from 'react-router';
import { SecureRoute } from 'react-route-guard';
import { MainPageContainer } from './pages/Main';
import { LoginPageContainer } from './pages/Login';
import { HeaderContainer } from './containers/Header';
import {SignInContainer} from './pages/SignIn';
import {StoryPageContainer} from './components/Story/StoryReading';
import {CreatePageContainer} from './pages/Create';
import {EditStoryContainer} from './components/EditStory/EditStory';
import {ProfilePageContainer} from './pages/Profile';
import {ListPageContainer} from './pages/ListPage';
import {AddNewStory} from './components/AddNewStory';
import {StoryDetailsPageContainer} from './components/Story/StoryDetailsPage';
import {UserRouteGuard} from './utils/UserRouteGuard';

export const App = ({}) => (
    <>
        <HeaderContainer />
        <Switch>
            <Route path='/login' component={LoginPageContainer}/>
            <Route path='/signin' component={SignInContainer}/>
            <Route path='/profile' component={UserRouteGuard(ProfilePageContainer)} />
            <Route path='/story/list/:type' component={ListPageContainer}/>
            <Route path='/story/create' component={UserRouteGuard(CreatePageContainer)} />
            <Route path='/story/:id/update' component={UserRouteGuard(CreatePageContainer)} />
            <Route path='/story/:id/edit' component={UserRouteGuard(EditStoryContainer)} />
            <Route path='/story/:id/read' component={StoryPageContainer}/>
            <Route path='/story/:id' exect={true} component={StoryDetailsPageContainer}/>
            <Route path='/' component={MainPageContainer}/>
        </Switch>
        <AddNewStory />
    </>
);
