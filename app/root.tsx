import { cssBundleHref } from "@remix-run/css-bundle";
import type {LinksFunction, MetaFunction} from "@remix-run/node";
import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration,} from "@remix-run/react";
import {withEmotionCache} from '@emotion/react';
import ClientStyleContext from './mui/ClientStyleContext';
import {AppBar, Box, Button, CssBaseline, IconButton, Toolbar, Typography, unstable_useEnhancedEffect as useEnhancedEffect} from '@mui/material';
import React from "react";
import {Menu} from '@mui/icons-material';
import {ThemeProvider} from "@mui/system";
import theme from "~/mui/theme";


export const links: LinksFunction = () => [...(cssBundleHref ? [{rel: "stylesheet", href: cssBundleHref}] : [])
    ]
;

interface DocumentProps {
    children: React.ReactNode;
    title?: string;
}

export const meta: MetaFunction = () => {
    return [
        {title: "New Remix App"},
        {property: "og:title", content: "New Remix App"},
        {viewport: "width=device-width,initial-scale=1"},
        {charset: "utf-8"},
    ];
};

const Document = withEmotionCache(({children, title}: DocumentProps, emotionCache) => {
    const clientStyleData = React.useContext(ClientStyleContext);

    // Only executed on client
    useEnhancedEffect(() => {
        // re-link sheet container
        emotionCache.sheet.container = document.head;
        // re-inject tags
        const tags = emotionCache.sheet.tags;
        emotionCache.sheet.flush();
        tags.forEach((tag) => {
            // eslint-disable-next-line
            (emotionCache.sheet as any)._insertTag(tag);
        });
        // reset cache to reapply global styles
        clientStyleData.reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <html lang="en">
        <head>
            <Meta/>
            <Links/>
            <CssBaseline/>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <meta name="emotion-insertion-point" content="emotion-insertion-point"/>
        </head>
        <body>
        <ThemeProvider theme={theme}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {title}
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            {children}
            <footer>
                <p>Footer</p>
            </footer>
        </ThemeProvider>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
});

export default function App() {
    return (
        <Document title="Testing Remix / Mui">
            <Outlet/>
        </Document>
    );
}
