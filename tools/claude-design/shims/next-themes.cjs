// No theme switching inside a design canvas: the canvas sets data-theme itself.
module.exports = {
  useTheme: () => ({ theme: "light", resolvedTheme: "light", systemTheme: "light", themes: ["light", "dark"], setTheme() {} }),
  ThemeProvider: ({ children }) => children,
}
