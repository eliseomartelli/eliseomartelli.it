import Typography from "typography"
import grandViewTheme from "typography-theme-grand-view"

grandViewTheme.overrideThemeStyles = () => ({
  a: {
    color: "var(--secondary)",
  },
  "a:hover": { color: "var(--primary)" },
  blockquote: {
    color: "inherit",
    borderLeftColor: "var(--primary)",
  },
  // These two are for gatsby-remark-autolink-headers:
  "a.anchor": {
    boxShadow: "none",
  },
  'a.anchor svg[aria-hidden="true"]': {
    stroke: "var(--secondary)",
  },
  "h1, h2, h3, h4, h5": { color: "var(--text)" },
})

const typography = new Typography(grandViewTheme)

export const { scale, rhythm, options } = typography
export default typography
