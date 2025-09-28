/** @type {import('next').NextConfig} */
const nextConfig = {
    outputFileTracingRoot: __dirname, // sets root to current project
     images: {
    remotePatterns: [new URL('http:/localhost:3000/uploads/images/**')],
  },
}

module.exports = nextConfig
