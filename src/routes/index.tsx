import React from 'react';
import {  NavigationContainer } from '@react-navigation/native';

import { AuthRoute } from './auth.routes';
import { useAuth } from '../hooks/auth';
import { SignIn } from  '../screens/Signin'


export function Routes(){
    const  { user } = useAuth();
    
    return (
        <NavigationContainer>
            { user.id ? <AuthRoute /> : <SignIn /> }
        </NavigationContainer>

    )
}