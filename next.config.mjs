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
        ],
      },
};

export default nextConfig;
