module.exports = {
  plugins: [
    require("tailwindcss"),
    require("postcss-prune-var"),
    require("postcss-variable-compress"),
    require("autoprefixer"),
    require("cssnano")({
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
  ]
}