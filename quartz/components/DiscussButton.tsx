import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface DiscussButtonOptions {
  repo: string
  labels: string[]
}

const defaultOptions: DiscussButtonOptions = {
  repo: "huangrh99/obsidian-papers",
  labels: ["discussion"],
}

export default ((opts?: Partial<DiscussButtonOptions>) => {
  const options: DiscussButtonOptions = { ...defaultOptions, ...opts }

  const DiscussButton: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    // Only show on content pages, not index/folder pages
    const slug = fileData.slug
    if (!slug || slug === "index" || slug.endsWith("/index")) {
      return null
    }

    const title = fileData.frontmatter?.title ?? fileData.slug?.split("/").pop() ?? "this paper"
    const arxivId = fileData.frontmatter?.arxiv_id ?? ""
    const issueTitle = `💬 ${title}${arxivId ? ` (${arxivId})` : ""}`
    const issueBody = `Paper: **${title}**${arxivId ? `\nArXiv: https://arxiv.org/abs/${arxivId}` : ""}\n\n---\n_Write your thoughts below:_\n`

    const params = new URLSearchParams({
      title: issueTitle,
      body: issueBody,
      labels: options.labels.join(","),
    })

    const url = `https://github.com/${options.repo}/issues/new?${params.toString()}`

    return (
      <div class={classNames(displayClass, "discuss-button-container")}>
        <a href={url} target="_blank" rel="noopener noreferrer" class="discuss-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>讨论这篇论文</span>
        </a>
      </div>
    )
  }

  DiscussButton.css = `
  .discuss-button-container {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--lightgray);
    text-align: center;
  }
  .discuss-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    background: var(--secondary);
    color: var(--light) !important;
    font-weight: 600;
    font-size: 0.9rem;
    text-decoration: none !important;
    transition: opacity 0.2s ease, transform 0.15s ease;
  }
  .discuss-button:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
  .discuss-button svg {
    flex-shrink: 0;
  }
  `

  return DiscussButton
}) satisfies QuartzComponentConstructor
