--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
import           Data.Monoid (mappend)
import           Hakyll


--------------------------------------------------------------------------------

customConfiguration = defaultConfiguration { destinationDirectory = "blog" }
srcRoute = gsubRoute "src/" (const "")

main :: IO ()
main = hakyllWith customConfiguration $ do
    match "src/assets/*" $ do
        route   srcRoute
        compile copyFileCompiler

    match "src/css/*" $ do
        route   srcRoute
        compile compressCssCompiler

    match (fromList ["src/about.md", "src/contact.md"]) $ do
        route   $ srcRoute `composeRoutes` setExtension "html"
        compile $ pandocCompiler
            >>= loadAndApplyTemplate "src/templates/default.html" defaultContext
            >>= relativizeUrls

    match "src/posts/*" $ do
        route $ srcRoute `composeRoutes` setExtension "html"
        compile $ pandocCompiler
            >>= loadAndApplyTemplate "src/templates/post.html"    postCtx
            >>= loadAndApplyTemplate "src/templates/default.html" postCtx
            >>= relativizeUrls

    create ["archive.html"] $ do
        route srcRoute
        compile $ do
            posts <- recentFirst =<< loadAll "posts/*"
            let archiveCtx =
                    listField "posts" postCtx (return posts) `mappend`
                    constField "title" "Archives"            `mappend`
                    defaultContext

            makeItem ""
                >>= loadAndApplyTemplate "src/templates/archive.html" archiveCtx
                >>= loadAndApplyTemplate "src/templates/default.html" archiveCtx
                >>= relativizeUrls


    match "src/index.html" $ do
        route srcRoute
        compile $ do
            posts <- recentFirst =<< loadAll "src/posts/*"
            let indexCtx =
                    listField "posts" postCtx (return posts) `mappend`
                    constField "title" "Home"                `mappend`
                    defaultContext

            getResourceBody
                >>= applyAsTemplate indexCtx
                >>= loadAndApplyTemplate "src/templates/default.html" indexCtx
                >>= relativizeUrls

    match "src/templates/*" $ compile templateCompiler


--------------------------------------------------------------------------------
postCtx :: Context String
postCtx =
    dateField "date" "%B %e, %Y" `mappend`
    defaultContext
