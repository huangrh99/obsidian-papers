import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

const Comments = Component.Comments({
  provider: "giscus",
  options: {
    repo: "huangrh99/obsidian-papers",
    repoId: "R_kgDORdkaSg",
    category: "General",
    categoryId: "DIC_kwDORdkaSs4C4T_8",
    mapping: "pathname",
    strict: false,
    reactionsEnabled: true,
    inputPosition: "bottom",
    lang: "zh-CN",
  },
})

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/huangrh99",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
    mapFn: (node) => {
      if (!node.isFolder) {
        node.displayName = node.slugSegment ?? node.displayName
      }
      return node
    },
  }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
  afterBody: [Comments],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
    mapFn: (node) => {
      if (!node.isFolder) {
        node.displayName = node.slugSegment ?? node.displayName
      }
      return node
    },
  }),
  ],
  right: [],
}
