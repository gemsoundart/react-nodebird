const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins: [...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]local$/, /^\.\/ko$/),
      ],
    };
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

});
