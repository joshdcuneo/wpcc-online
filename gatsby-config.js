module.exports = {
  siteMetadata: {
    title: `WPCC Online`,
    description: `WPCC Church - Online`,
    author: `@joshdcuneo`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
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
        name: `wpcc-online`,
        short_name: `WPCC Online`,
        start_url: `/`,
        background_color: `#225b8b`,
        theme_color: `#225b8b`,
        display: `minimal-ui`,
        icon: `src/images/wpcc_logo_web.jpg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-109815883-7",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
