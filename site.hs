--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
import           Data.Monoid (mappend, (<>))
import           Hakyll
import           Text.Pandoc.Options


--------------------------------------------------------------------------------

customConfiguration :: Configuration
customConfiguration = defaultConfiguration { destinationDirectory = "blog" }

feedConfiguration :: FeedConfiguration
feedConfiguration = FeedConfiguration
    { feedTitle       = "lidavidm’s blog"
    , feedDescription = "David Li’s blog"
    , feedAuthorName  = "David Li"
    , feedAuthorEmail = "li.davidm96@gmail.com"
    , feedRoot        = "http://lidavidm.github.io/blog"
    }

pandocWriterOptions :: WriterOptions
pandocWriterOptions = (def :: WriterOptions) {
  writerHTMLMathMethod = MathJax "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML",
  writerHighlight = True
  }

srcRoute :: Routes
srcRoute = gsubRoute "src/" (const "")

main :: IO ()
main = hakyllWith customConfiguration $ do
    match "src/assets/*" $ do
        route   srcRoute
        compile copyFileCompiler

    match "src/css/*" $ do
        route   srcRoute
        compile compressCssCompiler

    match "src/css/crimson/*" $ do
        route   srcRoute
        compile copyFileCompiler

    match "src/js/*" $ do
        route   srcRoute
        compile copyFileCompiler

    match "src/about.md" $ do
        route   $ srcRoute `composeRoutes` setExtension "html"
        compile $ pandocCompiler
            >>= loadAndApplyTemplate "src/templates/nopadding.html" defaultContext
            >>= loadAndApplyTemplate "src/templates/base.html" defaultContext
            >>= relativizeUrls

    match "src/posts/*" $ do
        route $ srcRoute `composeRoutes` setExtension "html"
        compile $ pandocCompilerWith (def :: ReaderOptions) (pandocWriterOptions)
            >>= saveSnapshot "teaser"
            >>= loadAndApplyTemplate "src/templates/post.html"    postCtx
            >>= saveSnapshot "content"
            >>= loadAndApplyTemplate "src/templates/default.html" postCtx
            >>= loadAndApplyTemplate "src/templates/base.html" postCtx
            >>= relativizeUrls

    match "src/archive.html" $ do
        route srcRoute
        compile $ do
            posts <- recentFirst =<< loadAll "src/posts/*"
            let indexCtx =
                    listField "posts" postCtx (return posts) `mappend`
                    defaultContext

            getResourceBody
                >>= applyAsTemplate indexCtx
                >>= loadAndApplyTemplate "src/templates/default.html" indexCtx
                >>= loadAndApplyTemplate "src/templates/base.html" indexCtx
                >>= relativizeUrls

    match "src/index.html" $ do
        route srcRoute
        compile $ do
            posts <- recentFirst =<< loadAll "src/posts/*"
            let indexCtx =
                    listField "posts" postCtx (return posts) <>
                    constField "title" "Home"                <>
                    defaultContext

            getResourceBody
                >>= applyAsTemplate indexCtx
                >>= loadAndApplyTemplate "src/templates/default.html" indexCtx
                >>= loadAndApplyTemplate "src/templates/base.html" indexCtx
                >>= relativizeUrls

    create ["atom.xml"] $ do
      route idRoute
      compile $ do
        let feedCtx = postCtx `mappend` bodyField "description"
        posts <- recentFirst =<<
            loadAllSnapshots "src/posts/*" "content"
        renderAtom feedConfiguration feedCtx posts

    match "src/templates/*" $ compile templateCompiler


--------------------------------------------------------------------------------
postCtx :: Context String
postCtx =
    dateField "date" "%B %e, %Y" <>
    teaserField "teaser" "teaser" <>
    defaultContext
