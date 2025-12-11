import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import AppTheme from './providers/ThemeProvider'
import BaseLayout from './layout/BaseLayout'
import Loading from './components/Loading'
import QueryProvider from './providers/QueryProvider'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
    const HomePage = lazy(() => import('./pages/Home'))
    const QuizPage = lazy(() => import('./pages/Quiz'))
    const SettingsPage = lazy(() => import('./pages/Settings'))

    useEffect(() => {
        if ('storage' in navigator && 'persist' in navigator.storage) {
            navigator.storage.persist().then((granted) => {
                console.log(
                    granted
                        ? 'Storage persistence granted'
                        : 'Storage persistence denied'
                )
            })
        }
    }, [])

    const router = createBrowserRouter(
        [
            {
                path: '/home',
                element: (
                    <Suspense fallback={<Loading />}>
                        <BaseLayout>
                            <HomePage />
                        </BaseLayout>
                    </Suspense>
                ),
            },
            {
                path: '/quiz',
                element: (
                    <Suspense fallback={<Loading />}>
                        <BaseLayout>
                            <QuizPage />
                        </BaseLayout>
                    </Suspense>
                ),
            },
            {
                path: '/settings',
                element: (
                    <Suspense fallback={<Loading />}>
                        <BaseLayout>
                            <SettingsPage />
                        </BaseLayout>
                    </Suspense>
                ),
            },
            {
                path: '*',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Navigate to="/home" />
                    </Suspense>
                ),
            },
        ],
        {
            basename: '/dictionary-fe',
        }
    )

    return (
        <ErrorBoundary>
            <QueryProvider>
                <AppTheme>
                    <RouterProvider router={router} />
                </AppTheme>
            </QueryProvider>
        </ErrorBoundary>
    )
}

export default App
