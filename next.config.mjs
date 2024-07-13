/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'sqcidocbglgivrlysuhq.supabase.co',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'i.imgur.com',
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'https',
            hostname: 'cdn.pixabay.com',
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'https',
            hostname: 'placeimg.com',
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'https',
            hostname: 'unsplash.com',
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'https',
            hostname: 'api.escuelajs.co',
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'https',
            hostname: 'chiwawadog.com',
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**'
          }
        ],
      },
};

export default nextConfig;
