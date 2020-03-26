module.exports = {
  siteMetadata: {
    title: `WPCC Online`,
    description: `WPCC Church - Online`,
    author: `@joshdcuneo`,
    youtubeLink:
      "https://www.youtube.com/embed/videoseries?list=PLJbXzmMjnMZKGPNzDb2qpyvacVYTui2n9",
    bibleReading: "bible/111/ISA.9.NIV",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-theme-material-ui`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/wpcc_logo_web.jpg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
